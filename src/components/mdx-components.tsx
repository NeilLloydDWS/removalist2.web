import Image from "next/image";
import Link from "next/link";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ---------- Callout ---------- */
const calloutVariants = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  important: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
  },
};

export function Callout({
  variant = "info",
  children,
}: {
  variant?: keyof typeof calloutVariants;
  children: React.ReactNode;
}) {
  const config = calloutVariants[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        config.bg,
        config.border
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", config.iconColor)} />
      <div className="text-sm [&_p]:m-0">{children}</div>
    </div>
  );
}

/* ---------- ImageWithCaption ---------- */
export function ImageWithCaption({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- VideoEmbed ---------- */
export function VideoEmbed({
  src,
  title = "Video",
}: {
  src: string;
  title?: string;
}) {
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-lg">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full border-0"
      />
    </div>
  );
}

/* ---------- CTABanner ---------- */
export function CTABanner({
  heading = "Try VanMan free for 14 days",
  text = "No credit card required. Get your moving company organised in minutes.",
  buttonText = "Start Free Trial",
  href = "/signup",
}: {
  heading?: string;
  text?: string;
  buttonText?: string;
  href?: string;
}) {
  return (
    <div className="my-8 rounded-lg bg-primary/5 p-6 text-center sm:p-8">
      <h3 className="text-lg font-semibold">{heading}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      <Button asChild className="mt-4">
        <Link href={href}>{buttonText}</Link>
      </Button>
    </div>
  );
}

/* ---------- StepByStep ---------- */
export function StepByStep({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 space-y-4 [counter-reset:step]">{children}</div>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-4 [counter-increment:step]">
      <div className="flex shrink-0 items-start">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground before:content-[counter(step)]" />
      </div>
      <div className="flex-1 pb-4">
        <h4 className="mb-1 font-semibold">{title}</h4>
        <div className="text-sm [&_p]:mb-2 [&_p]:last:mb-0">{children}</div>
      </div>
    </div>
  );
}

/* ---------- UIPath ---------- */
export function UIPath({ path }: { path: string }) {
  const parts = path.split(">");
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      {parts.map((part, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && (
            <span className="text-muted-foreground" aria-hidden="true">
              &rarr;
            </span>
          )}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
            {part.trim()}
          </code>
        </span>
      ))}
    </span>
  );
}

/* ---------- KeyboardShortcut ---------- */
export function KeyboardShortcut({ keys }: { keys: string }) {
  const parts = keys.split("+");
  return (
    <span className="inline-flex items-center gap-0.5">
      {parts.map((key, i) => (
        <span key={i} className="inline-flex items-center gap-0.5">
          {i > 0 && <span className="text-muted-foreground">+</span>}
          <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            {key.trim()}
          </kbd>
        </span>
      ))}
    </span>
  );
}

/* ---------- MDX component map ---------- */
export const mdxComponents = {
  Callout,
  ImageWithCaption,
  VideoEmbed,
  CTABanner,
  StepByStep,
  Step,
  UIPath,
  KeyboardShortcut,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-10 scroll-mt-20 text-2xl font-bold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 scroll-mt-20 text-xl font-semibold"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mb-2 mt-6 scroll-mt-20 text-lg font-semibold"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-1 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border bg-muted px-3 py-2 text-left font-medium"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
      {...props}
    />
  ),
  a: ({
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary underline-offset-4 hover:underline"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-4 hover:underline"
        {...props}
      />
    );
  },
  hr: () => <hr className="my-8 border-border" />,
};
