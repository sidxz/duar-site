// NEXT_PUBLIC_BASE_PATH is set by .github/workflows/deploy.yml to "/duar-site"
// while the site lives at sidxz.github.io/duar-site. Remove it (and add
// public/CNAME) when the site moves to duar.io.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
