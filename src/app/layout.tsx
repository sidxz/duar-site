import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// Schibsted Grotesk (variable, latin) for display + body; DM Mono for labels,
// buttons, code and the hero ledger. Self-hosted, no Google Fonts at runtime.
const sans = localFont({
  src: [{ path: "./fonts/schibsted-grotesk-latin-wght-normal.woff2", weight: "400 600" }],
  variable: "--font-schibsted",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "./fonts/dm-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/dm-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://duar.io/";

export const metadata: Metadata = {
  title: {
    default: "Duar — Authorization for everything after login",
    template: "%s | Duar",
  },
  description:
    "Bring your own IdP. Duar adds workspaces, roles, and per-resource permissions — one RS256 JWT, SDKs for FastAPI, React, and Next.js. Self-hosted, open source.",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
