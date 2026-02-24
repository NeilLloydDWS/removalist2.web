import { Suspense } from "react";
import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding/wizard";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Set up your VanMan account in minutes.",
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
