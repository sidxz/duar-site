"use client";

import { useEffect, useRef } from "react";

/* Exploded view of one request passing through Sentinel's three authorization
   tiers: workspace role (from the JWT, no DB), RBAC action, entity ACL. The
   exploded geometry below is the source of truth (what SSR and reduced-motion
   users get); JS collapses the plates on mount and an IntersectionObserver
   releases them once, letting CSS transitions carry them back out. */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DURATION = 700; // ms per plate
const STAGGER = 60; // ms between plates
const COLLAPSE = [130, 0, -130]; // px translateY: exploded → stacked pile
const INK = "#0b0b0d";
const MONO = "var(--font-plex-mono), monospace";

const plates = [
  { y: 40, title: "WORKSPACE ROLES", sub: "JWT CLAIMS · NO DB CALL", chip: "role: editor", w: 100 },
  { y: 170, title: "CUSTOM RBAC", sub: "ACTIONS · ROLES · DB", chip: "reports:export", w: 116 },
  { y: 300, title: "ENTITY ACLS", sub: "ZANZIBAR-STYLE · PER RESOURCE", chip: "document:42 · view", w: 140 },
];

export function TierStack({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const layers = useRef<(SVGGElement | null)[]>([]);
  const fades = useRef<(SVGGElement | null)[]>([]); // [0] spine+request chips, [1] verdict chips

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const svg = svgRef.current;
    const els = layers.current.filter((el): el is SVGGElement => el !== null);
    const notes = fades.current.filter((el): el is SVGGElement => el !== null);
    if (!svg || els.length !== COLLAPSE.length) return;

    // collapse without transitions, flush, then arm transitions
    els.forEach((el, i) => {
      el.style.transition = "none";
      el.style.transform = `translateY(${COLLAPSE[i]}px)`;
    });
    for (const el of notes) {
      el.style.transition = "none";
      el.style.opacity = "0";
    }
    void svg.getBoundingClientRect();
    els.forEach((el, i) => {
      el.style.transition = `transform ${DURATION}ms ${EASE} ${i * STAGGER}ms`;
    });
    for (const el of notes) el.style.transition = "opacity 500ms ease-out 700ms";

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.intersectionRatio >= 0.34)) return;
        io.disconnect();
        for (const el of els) el.style.transform = "translateY(0px)";
        for (const el of notes) el.style.opacity = "1";
      },
      { threshold: 0.35 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 500"
      role="img"
      aria-label="A request GET /projects/42 passes down through three plates — workspace roles from the JWT, custom RBAC actions, entity ACLs — each emitting a verdict chip, and exits as 200 OK"
      className={className}
    >
      <defs>
        <marker id="ts-arw" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 0.8 L6.8 4 L1 7.2" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* request spine + request/response chips (fade; painted behind plates) */}
      <g
        ref={(el) => {
          fades.current[0] = el;
        }}
      >
        <line x1="190" y1="24" x2="190" y2="468" stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#ts-arw)" />
        <rect x="132" y="4" width="116" height="20" fill="#ffffff" stroke={INK} strokeWidth="1" />
        <text x="190" y="18" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={INK}>
          GET /projects/42
        </text>
        <rect x="150" y="474" width="80" height="20" fill="var(--color-wash)" stroke={INK} strokeWidth="1" />
        <text x="182" y="488" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={INK}>
          200 OK
        </text>
        <path d="M212 484 l3 3 l6 -6" fill="none" stroke={INK} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* the three plates */}
      {plates.map((p, i) => (
        <g
          key={p.title}
          ref={(el) => {
            layers.current[i] = el;
          }}
        >
          <polygon
            points={`60,${p.y + 56} 190,${p.y + 112} 320,${p.y + 56} 320,${p.y + 66} 190,${p.y + 122} 60,${p.y + 66}`}
            fill="var(--color-wash)"
            stroke={INK}
            strokeWidth="1"
          />
          <polygon
            points={`190,${p.y} 320,${p.y + 56} 190,${p.y + 112} 60,${p.y + 56}`}
            fill="#ffffff"
            stroke={INK}
            strokeWidth="1.2"
          />
          <text x="190" y={p.y + 53} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="0.12em" fill={INK}>
            {p.title}
          </text>
          <text x="190" y={p.y + 68} textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="0.08em" fill={INK} opacity="0.5">
            {p.sub}
          </text>
        </g>
      ))}

      {/* verdict chips (fade in after the explode) */}
      <g
        ref={(el) => {
          fades.current[1] = el;
        }}
      >
        {plates.map((p) => (
          <g key={p.chip}>
            <line x1="320" y1={p.y + 56} x2="332" y2={p.y + 46} stroke="var(--color-line)" strokeWidth="1" />
            <rect x="332" y={p.y + 36} width={p.w} height="20" fill="#ffffff" stroke={INK} strokeWidth="1" />
            <text x="340" y={p.y + 50} fontFamily={MONO} fontSize="10.5" fill={INK}>
              {p.chip}
            </text>
            <path d={`M${332 + p.w - 16} ${p.y + 46} l3 3 l6 -6`} fill="none" stroke={INK} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </g>
    </svg>
  );
}
