import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}

const colStyles: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ cols = 3, children, className, ...props }: GridProps) {
  return (
    <div className={cn("grid gap-6 lg:gap-8", colStyles[cols], className)} {...props}>
      {children}
    </div>
  );
}
