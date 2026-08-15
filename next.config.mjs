// NEXT_PUBLIC_BASE_PATH is unset in production (custom domain duar.io). Set it
// only if the site is ever served under a sub-path again.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
