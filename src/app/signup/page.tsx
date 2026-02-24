import type { Metadata } from "next";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your free VanMan account. Start your 14-day free trial — no credit card required.",
  openGraph: {
    title: "Sign Up | VanMan",
    description: "Create your free VanMan account and start your 14-day free trial.",
  },
};

export default function SignupPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>
          <SignupForm />
        </div>
      </Container>
    </Section>
  );
}
