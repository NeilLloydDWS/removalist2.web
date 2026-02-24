"use client";

import { useState } from "react";
import { Smartphone, QrCode, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepMobileProps {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onUpdateData: (downloaded: boolean) => void;
}

export function StepMobile({
  onNext,
  onBack,
  onSkip,
  onUpdateData,
}: StepMobileProps) {
  const [linkSent, setLinkSent] = useState(false);

  function handleSendLink() {
    // In production, send SMS/email with app download links
    setLinkSent(true);
    onUpdateData(true);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6">
        <div className="text-center">
          <Smartphone className="mx-auto size-12 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">
            Get the VanMan mobile app
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your drivers see their assigned jobs, track delivery times, chat
            with the team, and navigate to addresses — all from their phone.
          </p>
        </div>

        {/* App store badges */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex h-12 items-center rounded-lg bg-foreground px-4">
            <div className="text-background">
              <p className="text-[10px] leading-tight">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </div>
          <div className="flex h-12 items-center rounded-lg bg-foreground px-4">
            <div className="text-background">
              <p className="text-[10px] leading-tight">GET IT ON</p>
              <p className="text-sm font-semibold leading-tight">Google Play</p>
            </div>
          </div>
        </div>

        {/* QR code placeholder */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex size-32 items-center justify-center rounded-lg border-2 border-dashed">
            <QrCode className="size-16 text-muted-foreground" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Scan to download on your phone
          </p>
        </div>

        {/* Send link button */}
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={handleSendLink}
            disabled={linkSent}
          >
            <Send className="size-4" />
            {linkSent
              ? "Download link sent to your team"
              : "Send download link to my team"}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button variant="ghost" onClick={onSkip}>
            Skip for now
          </Button>
        </div>
        <Button
          onClick={() => {
            onUpdateData(true);
            onNext();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
