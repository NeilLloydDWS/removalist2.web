"use client";

import { useState, useEffect } from "react";

export interface Experiment {
  id: string;
  variants: string[];
  weights: number[];
  enabled: boolean;
}

// Placeholder experiment — not active
export const experiments: Record<string, Experiment> = {
  homepage_hero_headline: {
    id: "homepage_hero_headline",
    variants: ["control", "variant_a"],
    weights: [50, 50],
    enabled: false,
  },
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

// Deterministic hash: FNV-1a
function hash(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function getVisitorId(): string {
  let id = getCookie("vanman_visitor_id");
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    setCookie("vanman_visitor_id", id, 365 * 24 * 60 * 60);
  }
  return id;
}

export function getVariant(
  experimentId: string,
  visitorId: string
): string {
  const exp = experiments[experimentId];
  if (!exp || !exp.enabled) return exp?.variants[0] ?? "control";

  const h = hash(visitorId + experimentId);
  const totalWeight = exp.weights.reduce((a, b) => a + b, 0);
  const bucket = h % totalWeight;

  let cumulative = 0;
  for (let i = 0; i < exp.variants.length; i++) {
    cumulative += exp.weights[i];
    if (bucket < cumulative) return exp.variants[i];
  }

  return exp.variants[0];
}

function getAbCookie(): Record<string, string> {
  const raw = getCookie("vanman_ab");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

function setAbCookie(assignments: Record<string, string>) {
  setCookie("vanman_ab", JSON.stringify(assignments), 365 * 24 * 60 * 60);
}

export function useExperiment(experimentId: string): string {
  const [variant, setVariant] = useState("control");

  useEffect(() => {
    const visitorId = getVisitorId();
    const existing = getAbCookie();

    if (existing[experimentId]) {
      setVariant(existing[experimentId]);
      return;
    }

    const assigned = getVariant(experimentId, visitorId);
    const updated = { ...existing, [experimentId]: assigned };
    setAbCookie(updated);
    setVariant(assigned);
  }, [experimentId]);

  return variant;
}
