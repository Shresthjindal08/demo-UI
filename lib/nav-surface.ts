const darkHeroPatterns = [
  /^\/$/,
  /^\/what-we-do\/[^/]+$/,
  /^\/projects$/,
  /^\/projects\/[^/]+$/,
];

const localLandingPattern = /^\/(solar|battery-storage|ev-charging)\/[^/]+$/;

export function heroSurface(pathname: string): "dark" | "light" {
  if (localLandingPattern.test(pathname)) return "dark";
  return darkHeroPatterns.some((pattern) => pattern.test(pathname))
    ? "dark"
    : "light";
}
