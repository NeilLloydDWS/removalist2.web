"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepXeroProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onUpdateData: (connected: boolean) => void;
}

export function StepXero({
  onNext,
  onBack,
  onSkip,
  onUpdateData,
}: StepXeroProps) {
  const [connected, setConnected] = useState(false);

  function handleConnect() {
    // In production, this would initiate the Xero OAuth flow
    // For now, simulate a connection
    setConnected(true);
    onUpdateData(true);
  }

  function handleSkip() {
    onUpdateData(false);
    onSkip();
  }

  function handleNext() {
    onNext();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6 text-center">
        {connected ? (
          <div className="space-y-3">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h3 className="text-lg font-semibold">Xero connected</h3>
            <p className="text-sm text-muted-foreground">
              Your Xero account is linked. Invoices will sync automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-xl bg-[#13B5EA]/10">
              <span className="text-2xl font-bold text-[#13B5EA]">xero</span>
            </div>
            <h3 className="text-lg font-semibold">Connect your Xero account</h3>
            <p className="mx-auto max-w-sm text-sm text-muted-foreground">
              Link VanMan to Xero to generate invoices from completed jobs and
              sync them automatically. No more double entry.
            </p>
            <ul className="mx-auto max-w-xs space-y-2 text-left text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-success" />
                One-click invoice generation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-success" />
                Two-way contact and payment sync
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-success" />
                Automatic account code validation
              </li>
            </ul>
            <Button onClick={handleConnect} className="mt-2">
              <ExternalLink className="size-4" />
              Connect Xero
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          {!connected && (
            <Button variant="ghost" onClick={handleSkip}>
              I&apos;ll do this later
            </Button>
          )}
        </div>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
