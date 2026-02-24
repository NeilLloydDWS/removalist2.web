import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Grid } from "@/components/grid";
import { Container } from "@/components/container";

const colors = [
  { name: "Primary", className: "bg-primary text-primary-foreground" },
  { name: "Secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "Accent", className: "bg-accent text-accent-foreground" },
  { name: "Muted", className: "bg-muted text-muted-foreground" },
  { name: "Destructive", className: "bg-destructive text-white" },
  { name: "Success", className: "bg-success text-success-foreground" },
  { name: "Warning", className: "bg-warning text-warning-foreground" },
  { name: "Background", className: "bg-background text-foreground border" },
  { name: "Card", className: "bg-card text-card-foreground border" },
];

export default function StyleGuidePage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Dev Only"
          heading="Style Guide"
          subheading="Design tokens, typography, colors, and components"
        />
      </Section>

      {/* Colors */}
      <Section variant="alternate-bg">
        <h2 className="mb-8 text-2xl font-bold">Colors</h2>
        <Grid cols={3}>
          {colors.map((color) => (
            <div key={color.name} className="overflow-hidden rounded-lg border">
              <div className={`flex h-20 items-center justify-center ${color.className}`}>
                <span className="text-sm font-medium">{color.name}</span>
              </div>
              <div className="bg-card px-3 py-2">
                <code className="text-xs text-muted-foreground">{color.className}</code>
              </div>
            </div>
          ))}
        </Grid>
      </Section>

      {/* Typography */}
      <Section>
        <h2 className="mb-8 text-2xl font-bold">Typography</h2>
        <div className="space-y-6">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">H1</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The quick brown fox
            </h1>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">H2</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The quick brown fox jumps
            </h2>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">H3</p>
            <h3 className="text-2xl font-semibold tracking-tight">
              The quick brown fox jumps over
            </h3>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">H4</p>
            <h4 className="text-xl font-semibold tracking-tight">
              The quick brown fox jumps over the lazy dog
            </h4>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Body</p>
            <p className="text-base">
              The quick brown fox jumps over the lazy dog. VanMan helps moving companies manage
              their entire business from one platform.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Small</p>
            <p className="text-sm text-muted-foreground">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Caption</p>
            <p className="text-xs text-muted-foreground">
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section variant="alternate-bg">
        <h2 className="mb-8 text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      {/* Cards */}
      <Section>
        <h2 className="mb-8 text-2xl font-bold">Cards</h2>
        <Grid cols={3}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Card Title {i}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This is sample card content showing the card design token in action.
              </p>
            </div>
          ))}
        </Grid>
      </Section>

      {/* Section Variants */}
      <Container className="py-8">
        <h2 className="mb-4 text-2xl font-bold">Section Variants</h2>
        <p className="text-sm text-muted-foreground">
          The sections on this page demonstrate: default, alternate-bg. Below are dark and gradient:
        </p>
      </Container>
      <Section variant="dark">
        <SectionHeader heading="Dark Section" subheading="For emphasis and CTAs" />
      </Section>
      <Section variant="gradient">
        <SectionHeader heading="Gradient Section" subheading="Subtle gradient backgrounds" />
      </Section>
    </>
  );
}
