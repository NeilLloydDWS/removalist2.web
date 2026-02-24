import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  Smartphone,
  MessagesSquare,
  CreditCard,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { getHelpCategories } from "@/lib/help";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  Smartphone,
  MessagesSquare,
  CreditCard,
};

export function HelpCategorySidebar({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = getHelpCategories();

  return (
    <nav aria-label="Help categories">
      <ul className="space-y-0.5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Rocket;
          const isActive = activeCategory === cat.slug;

          return (
            <li key={cat.slug}>
              <Link
                href={`/help/${cat.slug}`}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{cat.name}</span>
                {cat.articleCount > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {cat.articleCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
