"use server";

import {
  contactSchema,
  demoRequestSchema,
  type ContactFormData,
  type DemoRequestFormData,
} from "@/lib/schemas";

// In-memory rate limiting — max 3 submissions per email per hour
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const timestamps = submissionLog.get(email) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  submissionLog.set(email, recent);
  return recent.length >= RATE_LIMIT;
}

function recordSubmission(email: string) {
  const timestamps = submissionLog.get(email) ?? [];
  timestamps.push(Date.now());
  submissionLog.set(email, timestamps);
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Skip verification if Turnstile is not configured
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }
  );

  const result = (await response.json()) as { success: boolean };
  return result.success;
}

async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("SENDGRID_API_KEY not set — skipping email send");
    return;
  }

  await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: options.to }] }],
      from: { email: "noreply@vanman.app", name: "VanMan" },
      subject: options.subject,
      content: [{ type: "text/html", value: options.html }],
    }),
  });
}

interface FormResult {
  error?: string;
  success?: boolean;
}

export async function submitContactForm(
  data: ContactFormData,
  turnstileToken: string
): Promise<FormResult> {
  try {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { error: "Please check your form fields and try again." };
    }

    const verified = await verifyTurnstile(turnstileToken);
    if (!verified) {
      return { error: "Bot verification failed. Please try again." };
    }

    if (isRateLimited(parsed.data.email)) {
      return { error: "Too many submissions. Please try again later." };
    }

    const recipient =
      process.env.CONTACT_FORM_RECIPIENT_EMAIL ?? "hello@vanman.app";

    await sendEmail({
      to: recipient,
      subject: `Contact Form: ${parsed.data.enquiryType} from ${parsed.data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Company:</strong> ${parsed.data.companyName || "—"}</p>
        <p><strong>Region:</strong> ${parsed.data.region}</p>
        <p><strong>Enquiry Type:</strong> ${parsed.data.enquiryType}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    // In production, also insert into contact_submissions table:
    // await db.insert(contactSubmissions).values({ ...parsed.data, createdAt: new Date() });

    recordSubmission(parsed.data.email);
    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      error:
        "Something went wrong. Please try again or email us directly.",
    };
  }
}

export async function submitDemoRequest(
  data: DemoRequestFormData,
  turnstileToken: string
): Promise<FormResult> {
  try {
    const parsed = demoRequestSchema.safeParse(data);
    if (!parsed.success) {
      return { error: "Please check your form fields and try again." };
    }

    const verified = await verifyTurnstile(turnstileToken);
    if (!verified) {
      return { error: "Bot verification failed. Please try again." };
    }

    if (isRateLimited(parsed.data.email)) {
      return { error: "Too many submissions. Please try again later." };
    }

    const recipient =
      process.env.CONTACT_FORM_RECIPIENT_EMAIL ?? "hello@vanman.app";

    // Notification to sales team
    await sendEmail({
      to: recipient,
      subject: `Demo Request from ${parsed.data.name} (${parsed.data.companyName})`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Company:</strong> ${parsed.data.companyName}</p>
        <p><strong>Number of Trucks:</strong> ${parsed.data.numberOfTrucks || "—"}</p>
        <p><strong>Region:</strong> ${parsed.data.region}</p>
        <p><strong>Preferred Date/Time:</strong> ${parsed.data.preferredDate || "—"}</p>
        ${parsed.data.aboutBusiness ? `<hr /><p><strong>About Their Business:</strong></p><p>${parsed.data.aboutBusiness.replace(/\n/g, "<br />")}</p>` : ""}
      `,
    });

    // Confirmation email to requester
    await sendEmail({
      to: parsed.data.email,
      subject: "Your VanMan Demo Request",
      html: `
        <h2>Thanks for requesting a demo, ${parsed.data.name}!</h2>
        <p>We've received your request and our team will be in touch within 1 business day to schedule your personalised demo.</p>
        <p>In the meantime, feel free to explore our <a href="https://vanman.app/help">help center</a> or <a href="https://vanman.app/features">features</a> page.</p>
        <p>— The VanMan Team</p>
      `,
    });

    recordSubmission(parsed.data.email);
    return { success: true };
  } catch (error) {
    console.error("Demo request error:", error);
    return {
      error:
        "Something went wrong. Please try again or email us directly.",
    };
  }
}
