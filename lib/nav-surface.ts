import { routes } from "@/lib/routes";

export function heroSurface(pathname: string): "base" | "dark" {
  return pathname === routes.home ? "base" : "dark";
}
