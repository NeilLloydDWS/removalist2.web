"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Region,
  regionConfigs,
  t as translate,
  formatPrice as formatPriceUtil,
} from "@/lib/localization";

interface RegionContextValue {
  region: Region;
  setRegion: (region: Region) => void;
  t: (key: string) => string;
  formatPrice: (amount: number) => string;
}

const RegionContext = createContext<RegionContextValue | null>(null);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>("nz");

  useEffect(() => {
    const stored = getCookie("vanman_region");
    if (stored && ["nz", "au", "uk", "us"].includes(stored)) {
      setRegionState(stored as Region);
    }
  }, []);

  const setRegion = useCallback((newRegion: Region) => {
    setRegionState(newRegion);
    document.cookie = `vanman_region=${newRegion};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
    window.location.reload();
  }, []);

  const tFn = useCallback(
    (key: string) => translate(key, region),
    [region]
  );

  const formatPriceFn = useCallback(
    (amount: number) => formatPriceUtil(amount, region),
    [region]
  );

  return (
    <RegionContext.Provider
      value={{ region, setRegion, t: tFn, formatPrice: formatPriceFn }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion(): RegionContextValue {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}

// Re-export for convenience
export { regionConfigs };
