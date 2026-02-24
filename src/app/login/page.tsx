import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Log In",
  description:
    "Log in to your VanMan account to manage your moving company.",
  openGraph: {
    title: "Log In | VanMan",
    description: "Log in to your VanMan account.",
  },
};

export default function LoginPage() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Log in to your VanMan account
            </p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
