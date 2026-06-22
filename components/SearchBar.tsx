"use client";

import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const focused = document.activeElement === ref.current;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      } else if (e.key === "/" && !focused) {
        e.preventDefault();
        ref.current?.focus();
      } else if (e.key === "Escape" && focused) {
        onChange("");
        ref.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onChange]);

  return (
    <div className="sticky top-14 z-20 -mx-4 mb-8 border-b border-overlay bg-base/80 px-4 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 rounded-lg border border-overlay bg-surface px-4 py-3 transition-colors focus-within:border-iris">
        {/* command-mode prompt */}
        <span className="select-none font-mono text-iris">:</span>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="search commands, keys, descriptions…"
          aria-label="Search tmux commands"
          className="w-full bg-transparent font-mono text-sm text-text placeholder:text-muted focus:outline-none"
        />
        {value ? (
          <span className="shrink-0 font-mono text-xs text-muted">
            {resultCount} match{resultCount === 1 ? "" : "es"}
          </span>
        ) : (
          <kbd className="keycap hidden sm:inline-flex">⌘K</kbd>
        )}
      </div>
    </div>
  );
}
