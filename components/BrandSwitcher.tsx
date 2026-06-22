"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { VIM_URL } from "@/lib/site";

export function BrandSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Switch cheat sheet"
        onClick={() => setOpen((o) => !o)}
        className="group flex items-center"
      >
        <span className="flex h-8 items-center rounded-l-md bg-gold pl-2.5 pr-2 font-mono text-sm font-semibold text-ink">
          tmux
          <svg
            viewBox="0 0 12 12"
            aria-hidden
            className={`ml-1 h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
            fill="currentColor"
          >
            <path d="M3 4.5 6 7.5 9 4.5Z" />
          </svg>
        </span>
        <span
          aria-hidden
          className="h-8 w-0 border-y-[16px] border-l-[11px] border-y-transparent border-l-gold"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-dropdown mt-2 w-56 overflow-hidden rounded-lg border border-overlay bg-surface py-1 shadow-xl shadow-black/30"
        >
          <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            cheat sheets
          </p>
          <Link
            href="/"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 font-mono text-xs text-text transition-colors hover:bg-overlay"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            tmux cheatsheet
            <span className="ml-auto text-foam">on</span>
          </Link>
          <a
            href={VIM_URL}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 font-mono text-xs text-subtle transition-colors hover:bg-overlay hover:text-text"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-pine" />
            vim cheatsheet
            <svg
              viewBox="0 0 12 12"
              aria-hidden
              className="ml-auto h-3 w-3"
              fill="currentColor"
            >
              <path d="M3.5 3.5h5v5h-1.2V5.55L4.3 8.45l-.85-.85 2.9-2.9H3.5Z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
