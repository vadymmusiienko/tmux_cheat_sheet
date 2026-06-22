"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTool } from "./ToolContext";
import { ACCENT } from "./accent";
import { TOOLS } from "@/lib/tools";

export function BrandSwitcher() {
  const tool = useTool();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const brand = ACCENT[tool.brandAccent];

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
        <span
          className={`flex h-8 items-center rounded-l-md pl-2.5 pr-2 font-mono text-sm font-semibold text-ink ${brand.solid}`}
        >
          {tool.name}
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
          className={`h-8 w-0 border-y-[16px] border-l-[11px] border-y-transparent ${brand.borderL}`}
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
          {TOOLS.map((t) => {
            const active = t.id === tool.id;
            const dot = ACCENT[t.brandAccent].dot;
            return (
              <Link
                key={t.id}
                href={t.basePath}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 font-mono text-xs transition-colors hover:bg-overlay ${
                  active ? "text-text" : "text-subtle hover:text-text"
                }`}
              >
                <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
                {t.name} cheatsheet
                {active && <span className="ml-auto text-foam">on</span>}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
