"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Settings,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardData {
  companyName: string;
  trucksAdded: number;
  teamInvited: number;
  xeroConnected: boolean;
  appDownloaded: boolean;
}

interface StepDoneProps {
  onBack: () => void;
  wizardData: WizardData;
}

export function StepDone({ onBack, wizardData }: StepDoneProps) {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark onboarding as complete (in production, save to Clerk user metadata)
    // Simple CSS confetti animation on mount
    const container = confettiRef.current;
    if (!container) return;

    const colors = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6",
      "#EC4899",
    ];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement("div");
      piece.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        left: ${Math.random() * 100}%;
        top: -10px;
        opacity: 0;
        animation: confetti-fall ${Math.random() * 2 + 1.5}s ease-out ${Math.random() * 0.5}s forwards;
      `;
      container.appendChild(piece);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const summaryItems = [
    {
      label: "Company",
      value: wizardData.companyName || "Not set",
      done: !!wizardData.companyName,
    },
    {
      label: "Trucks added",
      value:
        wizardData.trucksAdded > 0
          ? `${wizardData.trucksAdded} truck${wizardData.trucksAdded > 1 ? "s" : ""}`
          : "None yet",
      done: wizardData.trucksAdded > 0,
    },
    {
      label: "Team members invited",
      value:
        wizardData.teamInvited > 0
          ? `${wizardData.teamInvited} invited`
          : "None yet",
      done: wizardData.teamInvited > 0,
    },
    {
      label: "Xero",
      value: wizardData.xeroConnected ? "Connected" : "Not connected",
      done: wizardData.xeroConnected,
    },
    {
      label: "Mobile app",
      value: wizardData.appDownloaded ? "Downloaded" : "Not downloaded",
      done: wizardData.appDownloaded,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Confetti container */}
      <div
        ref={confettiRef}
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      />

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
          }
        }
      `}</style>

      {/* Summary card */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Setup summary
        </h3>
        <ul className="space-y-3">
          {summaryItems.map((item) => (
            <li key={item.label} className="flex items-center justify-between">
              <span className="text-sm">{item.label}</span>
              <span className="flex items-center gap-2 text-sm">
                {item.value}
                {item.done && (
                  <CheckCircle2 className="size-4 text-success" />
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary CTA */}
      <Button asChild size="lg" className="w-full text-base">
        <a href="https://app.vanman.app/dashboard">
          Go to Dashboard
          <ArrowRight className="size-4" />
        </a>
      </Button>

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-3">
        <a
          href="https://app.vanman.app/jobs/new"
          className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
        >
          <Plus className="size-4 text-primary" />
          Create your first job
        </a>
        <a
          href="https://app.vanman.app/settings"
          className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
        >
          <Settings className="size-4 text-primary" />
          Explore settings
        </a>
        <Link
          href="/help/getting-started"
          className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
        >
          <BookOpen className="size-4 text-primary" />
          Getting started guide
        </Link>
      </div>

      <div className="flex justify-start">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
