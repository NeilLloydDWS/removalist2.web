"use client";

import { useEffect } from "react";
import { captureUTM } from "@/lib/analytics";
import { reportWebVitals, checkPerformanceBudget } from "@/lib/web-vitals";

export function AnalyticsInit() {
  useEffect(() => {
    captureUTM();
    reportWebVitals();
    checkPerformanceBudget();
  }, []);

  return null;
}
