"use client";

import { useState, useEffect } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function BlogToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const tocList = (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block rounded px-2 py-1 text-sm transition-colors hover:text-foreground",
              item.level === 3 && "pl-5",
              activeId === item.id
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        {tocList}
      </nav>

      {/* Mobile — collapsible */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between rounded-lg border bg-card p-3 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <List className="size-4" />
            Table of contents
          </span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              mobileOpen && "rotate-180"
            )}
          />
        </button>
        {mobileOpen && <div className="mt-2 rounded-lg border bg-card p-3">{tocList}</div>}
      </div>
    </>
  );
}
