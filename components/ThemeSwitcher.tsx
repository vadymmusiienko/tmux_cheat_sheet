"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTool } from "./ToolContext";

// Layout effect on the client (apply theme before paint, no flash); a no-op
// effect on the server so SSR doesn't warn.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Swatch({ bg, accent }: { bg: string; accent: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-hl-high"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${accent} 0 45%, ${bg} 47%)`,
      }}
    />
  );
}

export function ThemeSwitcher() {
  const tool = useTool();
  const themes = tool.themes;
  const fallback = tool.defaultTheme;

  const [theme, setTheme] = useState<string>(fallback);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fadeTimer = useRef<number | undefined>(undefined);

  // Apply this tool's saved theme (or its default) whenever the switcher mounts.
  // The switcher remounts on cross-tool navigation, so this also keeps each
  // tool's theme isolated — the inline <head> script only runs on full loads.
  useIsoLayoutEffect(() => {
    let saved = fallback;
    try {
      saved = localStorage.getItem(tool.storageKey) || fallback;
    } catch {
      /* ignore */
    }
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, [tool.storageKey, fallback]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(id: string) {
    setTheme(id);
    setOpen(false);
    const root = document.documentElement;
    // Crossfade colors for the switch only, then clear the class so it never
    // affects ordinary hovers/transitions. Reduced motion neutralizes it.
    root.classList.add("theme-transition");
    root.dataset.theme = id;
    window.clearTimeout(fadeTimer.current);
    fadeTimer.current = window.setTimeout(
      () => root.classList.remove("theme-transition"),
      300,
    );
    try {
      localStorage.setItem(tool.storageKey, id);
    } catch {
      /* ignore */
    }
  }

  const current = themes.find((t) => t.id === theme) ?? themes[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch theme"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 items-center gap-2 rounded-md border border-overlay bg-surface px-2.5 font-mono text-xs text-subtle transition-colors hover:border-hl-high hover:text-text"
      >
        <Swatch bg={current.bg} accent={current.accent} />
        <span className="hidden sm:inline">{current.name}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Theme"
          className="absolute right-0 z-dropdown mt-2 w-48 overflow-hidden rounded-lg border border-overlay bg-surface py-1 shadow-xl shadow-black/30"
        >
          {themes.map((t) => {
            const active = t.id === theme;
            return (
              <li key={t.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(t.id)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-mono text-xs transition-colors hover:bg-overlay ${
                    active ? "text-text" : "text-subtle"
                  }`}
                >
                  <Swatch bg={t.bg} accent={t.accent} />
                  {t.name}
                  {active && <span className="ml-auto text-foam">on</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
