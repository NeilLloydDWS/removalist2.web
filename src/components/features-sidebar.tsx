"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  BarChart3,
  Smartphone,
  MessagesSquare,
  Zap,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  BarChart3,
  Smartphone,
  MessagesSquare,
  Zap,
  Mail,
  MapPin,
};

export function FeaturesSidebar() {
  const [activeSlug, setActiveSlug] = useState(features[0].slug);

  useEffect(() => {
    const handleScroll = () => {
      for (const feature of features) {
        const el = document.getElementById(feature.slug);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSlug(feature.slug);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-24 space-y-1">
      {features.map((feature) => {
        const Icon = iconMap[feature.icon];
        return (
          <a
            key={feature.slug}
            href={`#${feature.slug}`}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              activeSlug === feature.slug
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {Icon && <Icon className="size-4 shrink-0" />}
            <span className="truncate">{feature.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
