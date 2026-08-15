// Static export under a basePath: next/link prefixes hrefs, plain <img src> does not.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
