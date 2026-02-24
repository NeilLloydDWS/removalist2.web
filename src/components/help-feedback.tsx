"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HelpFeedback({ articleSlug }: { articleSlug: string }) {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  function handleFeedback(helpful: boolean) {
    setFeedback(helpful);
    // Analytics event — no-op if analytics not yet implemented
    if (typeof window !== "undefined" && "trackEvent" in window) {
      const w = window as Record<string, unknown>;
      if (typeof w.trackEvent === "function") {
        (w.trackEvent as (...args: unknown[]) => void)("help", "feedback", {
          article: articleSlug,
          helpful,
        });
      }
    }
  }

  return (
    <div className="rounded-lg border bg-card p-5 text-center">
      {feedback === null ? (
        <>
          <p className="mb-3 text-sm font-medium">Was this article helpful?</p>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(true)}
            >
              <ThumbsUp className="size-4" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback(false)}
            >
              <ThumbsDown className="size-4" />
              No
            </Button>
          </div>
        </>
      ) : (
        <p
          className={cn(
            "text-sm font-medium transition-opacity",
            feedback !== null ? "opacity-100" : "opacity-0"
          )}
        >
          Thanks for your feedback!
        </p>
      )}
    </div>
  );
}
