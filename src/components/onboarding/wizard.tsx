"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { StepCompany } from "./step-company";
import { StepTrucks } from "./step-trucks";
import { StepTeam } from "./step-team";
import { StepXero } from "./step-xero";
import { StepMobile } from "./step-mobile";
import { StepDone } from "./step-done";

const steps = [
  { id: 1, label: "Company", description: "Your business details" },
  { id: 2, label: "Trucks", description: "Add your fleet" },
  { id: 3, label: "Team", description: "Invite your crew" },
  { id: 4, label: "Xero", description: "Connect accounting" },
  { id: 5, label: "Mobile App", description: "Get your team on board" },
  { id: 6, label: "Done", description: "You're all set" },
];

const stepHeadings: Record<number, { title: string; subtitle: string }> = {
  1: {
    title: "Let's get you set up",
    subtitle: "Tell us a bit about your business so we can configure VanMan for you.",
  },
  2: {
    title: "Add your trucks",
    subtitle: "Add the trucks you use for moving jobs. You can always add more later.",
  },
  3: {
    title: "Invite your team",
    subtitle: "Get your operators and drivers into VanMan so everyone's on the same page.",
  },
  4: {
    title: "Connect Xero",
    subtitle: "Link your Xero account to send invoices and track payments automatically.",
  },
  5: {
    title: "Get the mobile app",
    subtitle: "Your drivers and field staff can manage jobs from their phone.",
  },
  6: {
    title: "You're all set!",
    subtitle: "Your VanMan account is ready to go.",
  },
};

export function OnboardingWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialStep = Math.min(
    Math.max(Number(searchParams.get("step")) || 1, 1),
    6
  );
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const [wizardData, setWizardData] = useState({
    companyName: "",
    trucksAdded: 0,
    teamInvited: 0,
    xeroConnected: false,
    appDownloaded: false,
  });

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", String(step));
      router.replace(`/onboarding?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleNext = useCallback(() => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < 6) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, goToStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleSkip = useCallback(() => {
    if (currentStep < 6) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, goToStep]);

  const handleStepClick = useCallback(
    (stepId: number) => {
      if (stepId < currentStep || completedSteps.has(stepId)) {
        goToStep(stepId);
      }
    },
    [currentStep, completedSteps, goToStep]
  );

  const heading = stepHeadings[currentStep];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="border-b">
        <Container>
          <div className="flex h-16 items-center">
            <Logo />
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8 lg:py-12">
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="hidden md:block">
              <nav aria-label="Onboarding progress" className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.has(step.id);
                  const isCurrent = step.id === currentStep;
                  const isClickable =
                    step.id < currentStep || isCompleted;

                  return (
                    <div key={step.id} className="flex flex-1 items-center">
                      <button
                        onClick={() => handleStepClick(step.id)}
                        disabled={!isClickable && !isCurrent}
                        className={cn(
                          "flex items-center gap-3",
                          isClickable && "cursor-pointer"
                        )}
                      >
                        <div
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                            isCompleted &&
                              "bg-success text-success-foreground",
                            isCurrent &&
                              !isCompleted &&
                              "bg-primary text-primary-foreground",
                            !isCurrent &&
                              !isCompleted &&
                              "bg-muted text-muted-foreground"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="size-4" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="hidden text-left lg:block">
                          <p
                            className={cn(
                              "text-sm font-medium",
                              isCurrent
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {step.label}
                          </p>
                        </div>
                      </button>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "mx-3 h-px flex-1",
                            completedSteps.has(step.id)
                              ? "bg-success"
                              : "bg-border"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Mobile progress */}
            <div className="md:hidden">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-muted-foreground">
                  {steps[currentStep - 1].label}
                </span>
              </div>
              <div className="mt-2 flex gap-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      completedSteps.has(step.id)
                        ? "bg-success"
                        : step.id === currentStep
                          ? "bg-primary"
                          : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step heading */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {heading.title}
            </h1>
            <p className="mt-2 text-muted-foreground">{heading.subtitle}</p>
          </div>

          {/* Step content */}
          <div className="mx-auto max-w-xl">
            {currentStep === 1 && (
              <StepCompany
                onNext={handleNext}
                onSkip={handleSkip}
                onUpdateData={(name) =>
                  setWizardData((d) => ({ ...d, companyName: name }))
                }
              />
            )}
            {currentStep === 2 && (
              <StepTrucks
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onUpdateData={(count) =>
                  setWizardData((d) => ({ ...d, trucksAdded: count }))
                }
              />
            )}
            {currentStep === 3 && (
              <StepTeam
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onUpdateData={(count) =>
                  setWizardData((d) => ({ ...d, teamInvited: count }))
                }
              />
            )}
            {currentStep === 4 && (
              <StepXero
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onUpdateData={(connected) =>
                  setWizardData((d) => ({ ...d, xeroConnected: connected }))
                }
              />
            )}
            {currentStep === 5 && (
              <StepMobile
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onUpdateData={(downloaded) =>
                  setWizardData((d) => ({ ...d, appDownloaded: downloaded }))
                }
              />
            )}
            {currentStep === 6 && (
              <StepDone
                onBack={handleBack}
                wizardData={wizardData}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
