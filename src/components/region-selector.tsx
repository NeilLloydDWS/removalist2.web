"use client";

import { useRegion, regionConfigs } from "@/lib/region-provider";
import { type Region, allRegions } from "@/lib/localization";
import { cn } from "@/lib/utils";

export function RegionSelector() {
  const { region, setRegion } = useRegion();

  return (
    <div className="flex items-center gap-2">
      {allRegions.map((r) => {
        const config = regionConfigs[r];
        return (
          <button
            key={r}
            onClick={() => setRegion(r as Region)}
            className={cn(
              "rounded-md px-2 py-1 text-sm transition-colors",
              region === r
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            aria-label={`Switch to ${config.name}`}
            aria-pressed={region === r}
          >
            <span className="mr-1">{config.flag}</span>
            {r.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
