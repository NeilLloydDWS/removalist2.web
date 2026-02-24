import { Truck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Truck className="size-7 text-primary" />
      <span className="text-xl font-bold tracking-tight">VanMan</span>
    </Link>
  );
}
