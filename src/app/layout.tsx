import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const plexSans = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = localFont({
  src: [{ path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" }],
  variable: "--font-plex-mono",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL=https://duar.io at the domain flip.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sidxz.github.io/duar-site/";

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
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
