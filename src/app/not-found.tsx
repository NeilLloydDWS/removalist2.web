import Link from "next/link";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Search, Home, Layers, DollarSign, HelpCircle, BookOpen, Mail } from "lucide-react";

const popularLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/features", label: "Features", icon: Layers },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
  { href: "/help", label: "Help Center", icon: HelpCircle },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-lg text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>

        {/* Search link */}
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/help">
              <Search className="size-4" />
              Search Help Center
            </Link>
          </Button>
        </div>

        {/* Popular pages */}
        <div className="mt-10">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Popular pages
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
              >
                <link.icon className="size-4 text-muted-foreground" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Go Home CTA */}
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
