declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "category_click"
  | "popular_solution_click"
  | "nav_click"
  | "filter_use"
  | "view_toggle"
  | "form_start"
  | "form_step_complete"
  | "form_submit"
  | "download"
  | "guide_download"
  | "video_progress"
  | "phone_click"
  | "outbound_shop"
  | "scroll_depth"
  | "diagram_interact"
  | "tool_start"
  | "tool_complete"
  | "tool_to_contact";

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
