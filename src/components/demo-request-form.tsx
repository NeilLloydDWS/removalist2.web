"use client";

import { useState } from "react";
import { demoRequestSchema, type DemoRequestFormData } from "@/lib/schemas";
import { submitDemoRequest } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Loader2 } from "lucide-react";

const regions = ["NZ", "AU", "UK", "US", "Other"] as const;

export function DemoRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const data: DemoRequestFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      companyName: formData.get("companyName") as string,
      numberOfTrucks: (formData.get("numberOfTrucks") as string) || undefined,
      region: formData.get("region") as DemoRequestFormData["region"],
      preferredDate: (formData.get("preferredDate") as string) || undefined,
      aboutBusiness: (formData.get("aboutBusiness") as string) || undefined,
    };

    const parsed = demoRequestSchema.safeParse(data);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string") errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const turnstileToken =
      (document.querySelector<HTMLInputElement>(
        'input[name="cf-turnstile-response"]'
      )?.value) ?? "";

    const result = await submitDemoRequest(parsed.data, turnstileToken);
    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-8 text-center">
        <CheckCircle className="size-10 text-green-600" />
        <h3 className="text-lg font-semibold">Demo request received!</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll contact you within 1 business day to schedule.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="demo-name" name="name" required />
          {fieldErrors.name && (
            <p className="text-sm text-destructive">{fieldErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input id="demo-email" name="email" type="email" required />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-company">
            Company name <span className="text-destructive">*</span>
          </Label>
          <Input id="demo-company" name="companyName" required />
          {fieldErrors.companyName && (
            <p className="text-sm text-destructive">
              {fieldErrors.companyName}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-trucks">Number of trucks</Label>
          <Input
            id="demo-trucks"
            name="numberOfTrucks"
            type="number"
            min="1"
            placeholder="e.g. 5"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-region">
            Region <span className="text-destructive">*</span>
          </Label>
          <Select name="region" required defaultValue="NZ">
            <SelectTrigger id="demo-region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.region && (
            <p className="text-sm text-destructive">{fieldErrors.region}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="demo-date">Preferred date/time</Label>
          <Input id="demo-date" name="preferredDate" type="datetime-local" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-about">Tell us about your business</Label>
        <Textarea
          id="demo-about"
          name="aboutBusiness"
          rows={4}
          placeholder="How many jobs per week? What tools do you currently use?"
        />
      </div>

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
      )}

      {error && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request a Demo"
        )}
      </Button>
    </form>
  );
}
