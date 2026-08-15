const DOCS = "https://docs.duar.io";
const GITHUB = "https://github.com/sidxz/duar";

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
  pypi: "https://pypi.org/project/duar-auth/",
  npm: (pkg: "js" | "react" | "nextjs") =>
    `https://www.npmjs.com/package/@duar-auth/${pkg}`,
  ghcr: `${GITHUB}/pkgs/container/duar`,
} as const;
