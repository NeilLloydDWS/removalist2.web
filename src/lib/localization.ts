export type Region = "nz" | "au" | "uk" | "us";

export interface RegionConfig {
  name: string;
  flag: string;
  currencyCode: string;
  locale: string;
}

export const regionConfigs: Record<Region, RegionConfig> = {
  nz: { name: "New Zealand", flag: "\u{1F1F3}\u{1F1FF}", currencyCode: "NZD", locale: "en-NZ" },
  au: { name: "Australia", flag: "\u{1F1E6}\u{1F1FA}", currencyCode: "AUD", locale: "en-AU" },
  uk: { name: "United Kingdom", flag: "\u{1F1EC}\u{1F1E7}", currencyCode: "GBP", locale: "en-GB" },
  us: { name: "United States", flag: "\u{1F1FA}\u{1F1F8}", currencyCode: "USD", locale: "en-US" },
};

export const allRegions: Region[] = ["nz", "au", "uk", "us"];

// Terminology map: key → region-specific term
const terminology: Record<string, Record<Region, string>> = {
  removalist: {
    nz: "removalist",
    au: "removalist",
    uk: "removal company",
    us: "moving company",
  },
  truck: {
    nz: "truck",
    au: "truck",
    uk: "van",
    us: "truck",
  },
  booking: {
    nz: "booking",
    au: "booking",
    uk: "enquiry",
    us: "booking",
  },
  salesTax: {
    nz: "GST",
    au: "GST",
    uk: "VAT",
    us: "sales tax",
  },
  mobile: {
    nz: "mobile",
    au: "mobile",
    uk: "mobile",
    us: "cell phone",
  },
};

export function t(key: string, region: Region): string {
  return terminology[key]?.[region] ?? key;
}

export function formatPrice(amount: number, region: Region): string {
  const config = regionConfigs[region];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function countryCodeToRegion(countryCode: string): Region {
  const map: Record<string, Region> = {
    NZ: "nz",
    AU: "au",
    GB: "uk",
    US: "us",
  };
  return map[countryCode] ?? "nz";
}
