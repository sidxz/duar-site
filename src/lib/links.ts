const DOCS = "https://docs.sentinel-auth.com";
const GITHUB = "https://github.com/sidxz/Sentinel";

export const links = {
  docs: `${DOCS}/`,
  gettingStarted: `${DOCS}/getting-started/`,
  security: `${DOCS}/security/`,
  guide: (slug: string) => `${DOCS}/guide/${slug}/`,
  tutorialReact: `${DOCS}/tutorial/react/`,
  tutorialNext: `${DOCS}/tutorial/nextjs/`,
  sdkPython: `${DOCS}/sdk/`,
  sdkJs: `${DOCS}/js-sdk/`,
  github: GITHUB,
  issues: `${GITHUB}/issues`,
  changelog: `${GITHUB}/blob/main/CHANGELOG.md`,
  pypi: "https://pypi.org/project/sentinel-auth-sdk/",
  npm: (pkg: "js" | "react" | "nextjs") =>
    `https://www.npmjs.com/package/@sentinel-auth/${pkg}`,
  ghcr: `${GITHUB}/pkgs/container/sentinel`,
} as const;
