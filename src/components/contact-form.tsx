"use client";

import { useState } from "react";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { submitContactForm } from "@/app/actions/contact";
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
const enquiryTypes = [
  "General Question",
  "Sales Enquiry",
  "Partnership",
  "Support",
  "Other",
] as const;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      companyName: (formData.get("companyName") as string) || undefined,
      region: formData.get("region") as ContactFormData["region"],
      enquiryType: formData.get("enquiryType") as ContactFormData["enquiryType"],
      message: formData.get("message") as string,
    };

    const parsed = contactSchema.safeParse(data);
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
    // Turnstile token — pass empty string if widget not loaded (server skips if not configured)
    const turnstileToken =
      (document.querySelector<HTMLInputElement>(
        'input[name="cf-turnstile-response"]'
      )?.value) ?? "";

    const result = await submitContactForm(parsed.data, turnstileToken);
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
        <h3 className="text-lg font-semibold">Thanks for getting in touch!</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll get back to you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="contact-name" name="name" required />
          {fieldErrors.name && (
            <p className="text-sm text-destructive">{fieldErrors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input id="contact-email" name="email" type="email" required />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-company">Company name</Label>
          <Input id="contact-company" name="companyName" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-region">
            Region <span className="text-destructive">*</span>
          </Label>
          <Select name="region" required defaultValue="NZ">
            <SelectTrigger id="contact-region">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-type">
          Enquiry type <span className="text-destructive">*</span>
        </Label>
        <Select name="enquiryType" required defaultValue="General Question">
          <SelectTrigger id="contact-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {enquiryTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fieldErrors.enquiryType && (
          <p className="text-sm text-destructive">{fieldErrors.enquiryType}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="How can we help?"
        />
        {fieldErrors.message && (
          <p className="text-sm text-destructive">{fieldErrors.message}</p>
        )}
      </div>

      {/* Turnstile widget placeholder — renders when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
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
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
