"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = [
  { id: "rose-pine", name: "Rose Pine", bg: "#191724", accent: "#c4a7e7" },
  {
    id: "rose-pine-dawn",
    name: "Rose Pine Dawn",
    bg: "#faf4ed",
    accent: "#907aa9",
  },
  {
    id: "gruvbox-dark",
    name: "Gruvbox Dark",
    bg: "#282828",
    accent: "#fabd2f",
  },
  {
    id: "gruvbox-light",
    name: "Gruvbox Light",
    bg: "#fbf1c7",
    accent: "#b57614",
  },
] as const;

const DEFAULT = "rose-pine";

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
  const [theme, setTheme] = useState<string>(DEFAULT);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || DEFAULT);
  }, []);

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
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem("tmux-theme", id);
    } catch {
      /* ignore */
    }
  }

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch theme"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 items-center gap-2 rounded-md border border-overlay bg-surface px-2.5 font-mono text-xs text-subtle transition-colors hover:border-hl-high hover:text-text"
      >
        <Swatch bg={current.bg} accent={current.accent} />
        <span className="hidden sm:inline">{current.name}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Theme"
          className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-overlay bg-surface py-1 shadow-xl shadow-black/30"
        >
          {THEMES.map((t) => {
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
