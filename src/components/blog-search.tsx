"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchItem {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function BlogSearch({ searchIndex }: { searchIndex: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      const lower = q.toLowerCase();
      const matched = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.excerpt.toLowerCase().includes(lower) ||
          item.tags.some((t) => t.toLowerCase().includes(lower))
      );

      setResults(matched);
      setIsOpen(true);
    },
    [searchIndex]
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-lg border bg-card shadow-lg">
          {results.length > 0 ? (
            <ul className="divide-y">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {highlightMatch(item.title, query)}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {highlightMatch(item.excerpt, query)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No articles found for &quot;{query}&quot;. Try a different search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
