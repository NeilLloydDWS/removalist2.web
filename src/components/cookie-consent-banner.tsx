"use client";

import { useState } from "react";
import Link from "next/link";
import { useCookieConsent, type CookieConsent } from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories: {
  key: keyof CookieConsent;
  label: string;
  description: string;
  required: boolean;
}[] = [
  {
    key: "essential",
    label: "Essential",
    description:
      "Required for the website to function. Includes authentication, security, and session cookies.",
    required: true,
  },
  {
    key: "functional",
    label: "Functional",
    description:
      "Remembers your preferences such as theme, region, and language settings.",
    required: false,
  },
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Helps us understand how visitors use our website so we can improve it.",
    required: false,
  },
  {
    key: "marketing",
    label: "Marketing",
    description:
      "Used to deliver relevant advertisements and track ad campaign performance.",
    required: false,
  },
];

export function CookieConsentBanner() {
  const { hasConsented, acceptAll, rejectNonEssential, updateConsent } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  if (hasConsented) return null;

  function handleSavePreferences() {
    updateConsent(preferences);
    setShowPreferences(false);
  }

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:slide-in-from-bottom"
        role="region"
        aria-label="Cookie consent"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row">
          <p className="flex-1 text-sm text-muted-foreground">
            We use cookies to improve your experience.{" "}
            <Link
              href="/legal/cookies"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Cookie Policy
            </Link>
          </p>
          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={() => setShowPreferences(true)}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Manage Preferences
            </button>
            <Button variant="outline" size="sm" onClick={rejectNonEssential}>
              Reject Non-Essential
            </Button>
            <Button size="sm" onClick={acceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent aria-describedby="cookie-prefs-desc">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription id="cookie-prefs-desc">
              Choose which categories of cookies you&apos;d like to allow.
              Essential cookies are always enabled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="flex items-start justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">{cat.label}</Label>
                  <p className="text-xs text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <Switch
                  checked={cat.required || preferences[cat.key]}
                  disabled={cat.required}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({ ...prev, [cat.key]: checked }))
                  }
                  aria-label={`${cat.label} cookies`}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
