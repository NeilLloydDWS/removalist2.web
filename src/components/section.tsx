import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionVariant = "default" | "alternate-bg" | "dark" | "gradient";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  children: React.ReactNode;
  containerClassName?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  "alternate-bg": "bg-muted/50 text-foreground",
  dark: "bg-foreground text-background",
  gradient: "bg-gradient-to-br from-primary/10 via-background to-primary/5 text-foreground",
};

export function Section({
  variant = "default",
  children,
  className,
  containerClassName,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", variantStyles[variant], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
