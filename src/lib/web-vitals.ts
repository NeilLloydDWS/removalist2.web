"use client";

import { trackEvent } from "@/lib/analytics";

export function reportWebVitals(): void {
  // Only run in production
  if (process.env.NODE_ENV !== "production") return;

  // Dynamically import web-vitals to avoid bundling in dev
  import("web-vitals").then(({ onLCP, onINP, onCLS }) => {
    onLCP((metric) => {
      trackEvent("web_vitals", "lcp", undefined, {
        value: metric.value.toFixed(0),
        rating: metric.rating,
      });
    });

    onINP((metric) => {
      trackEvent("web_vitals", "inp", undefined, {
        value: metric.value.toFixed(0),
        rating: metric.rating,
      });
    });

    onCLS((metric) => {
      trackEvent("web_vitals", "cls", undefined, {
        value: metric.value.toFixed(4),
        rating: metric.rating,
      });
    });
  });
}

// Performance budget warnings (development only)
export function checkPerformanceBudget(): void {
  if (process.env.NODE_ENV !== "development") return;
  if (typeof window === "undefined") return;

  import("web-vitals").then(({ onLCP, onINP, onCLS }) => {
    onLCP((metric) => {
      if (metric.value > 2500) {
        console.warn(
          `[Performance] LCP ${metric.value.toFixed(0)}ms exceeds budget of 2500ms`
        );
      }
    });

    onINP((metric) => {
      if (metric.value > 200) {
        console.warn(
          `[Performance] INP ${metric.value.toFixed(0)}ms exceeds budget of 200ms`
        );
      }
    });

    onCLS((metric) => {
      if (metric.value > 0.1) {
        console.warn(
          `[Performance] CLS ${metric.value.toFixed(4)} exceeds budget of 0.1`
        );
      }
    });
  });
}
