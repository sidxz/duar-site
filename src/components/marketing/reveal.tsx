"use client";

import { useEffect } from "react";

/* Fade-up on first viewport entry for every `[data-reveal]` element
   (`data-reveal="stagger"` reveals the element's children 60ms apart).
   Mount once. SSR / no-JS / reduced-motion: everything is simply visible —
   the `.reveal` class is only added here, and only to elements still below
   the fold, so nothing on screen flashes at hydration. */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const targets = (el: HTMLElement) =>
      el.dataset.reveal === "stagger" ? (Array.from(el.children) as HTMLElement[]) : [el];

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          targets(e.target as HTMLElement).forEach((t, i) => {
            t.style.transitionDelay = `${i * 60}ms`;
            t.classList.add("is-in");
          });
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    const below = window.innerHeight * 0.85;
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.getBoundingClientRect().top < below) continue; // already on screen — leave it
      for (const t of targets(el)) t.classList.add("reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
  return null;
}
