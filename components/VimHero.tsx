"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/** The buffer shown in the hero — a peek at the real init config. */
const LINES: { no: number; spans: { t: string; tone?: string }[] }[] = [
  {
    no: 1,
    spans: [
      { t: "vim", tone: "text-iris" },
      { t: ".g." },
      { t: "mapleader", tone: "text-foam" },
      { t: " = " },
      { t: '" "', tone: "text-gold" },
    ],
  },
  { no: 2, spans: [{ t: "" }] },
  {
    no: 3,
    spans: [
      { t: "map", tone: "text-pine" },
      { t: "(" },
      { t: '"n"', tone: "text-gold" },
      { t: ", " },
      { t: '";"', tone: "text-gold" },
      { t: ", " },
      { t: '":"', tone: "text-gold" },
      { t: ")" },
    ],
  },
  {
    no: 4,
    spans: [
      { t: "map", tone: "text-pine" },
      { t: "(" },
      { t: '"i"', tone: "text-gold" },
      { t: ", " },
      { t: '"jk"', tone: "text-gold" },
      { t: ", " },
      { t: '"<ESC>"', tone: "text-gold" },
      { t: ")" },
    ],
  },
  { no: 5, spans: [{ t: "" }] },
  {
    no: 6,
    spans: [{ t: "-- vim-tmux-navigator", tone: "text-muted" }],
  },
  {
    no: 7,
    spans: [
      { t: "map", tone: "text-pine" },
      { t: "(" },
      { t: '"n"', tone: "text-gold" },
      { t: ", " },
      { t: '"<C-h>"', tone: "text-gold" },
      { t: ", " },
      { t: "tmux", tone: "text-foam" },
      { t: ".left)" },
    ],
  },
];

const MODES = [
  { label: "NORMAL", solid: "bg-pine", bar: false },
  { label: "INSERT", solid: "bg-foam", bar: true },
  { label: "VISUAL", solid: "bg-iris", bar: false },
] as const;

export function VimHero() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState(0);

  // Cycle the modeline the way you'd hop NORMAL → INSERT → VISUAL.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setMode((m) => (m + 1) % MODES.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const m = MODES[mode];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const row: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, x: -6 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <div className="overflow-hidden rounded-xl border border-overlay bg-surface/70 shadow-xl shadow-black/20">
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-overlay bg-base/40 px-3 py-2">
        <span className="font-mono text-xs text-foam">NVIM</span>
        <span className="font-mono text-xs text-muted">init.lua</span>
        <span className="ml-auto font-mono text-[10px] text-muted">
          ~/.config/nvim
        </span>
      </div>

      {/* buffer */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex h-52 flex-col gap-0.5 overflow-hidden p-3 font-mono text-[11px] leading-relaxed sm:h-60"
      >
        {LINES.map((line, i) => {
          const active = i === 0;
          return (
            <motion.div key={line.no} variants={row} className="flex gap-3">
              <span className="w-5 shrink-0 select-none text-right text-muted/70">
                {line.no}
              </span>
              <span className="text-subtle">
                {line.spans.map((s, j) => (
                  <span key={j} className={s.tone}>
                    {s.t}
                  </span>
                ))}
                {active &&
                  (m.bar ? (
                    <span className="cursor-blink ml-px inline-block h-[1.05em] w-px translate-y-[2px] bg-foam align-baseline" />
                  ) : (
                    <span className="cursor-blink ml-0.5 inline-block h-[1.05em] w-[0.5rem] translate-y-[2px] bg-foam/80 align-baseline" />
                  ))}
              </span>
            </motion.div>
          );
        })}
        {/* tilde gutter for empty lines below the buffer */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`~${i}`} className="flex gap-3">
            <span className="w-5 shrink-0 select-none text-right text-pine/50">
              ~
            </span>
          </div>
        ))}
      </motion.div>

      {/* statusline */}
      <div className="flex items-center gap-2 border-t border-overlay bg-base/50 px-0 py-0 font-mono text-xs">
        <span
          className={`px-2 py-1 font-semibold text-ink transition-colors ${m.solid}`}
        >
          {m.label}
        </span>
        <span className="truncate text-muted">init.lua</span>
        <span className="ml-auto flex items-center gap-3 pr-3 text-subtle">
          <span className="hidden sm:inline">utf-8</span>
          <span className="tabular-nums">1,1</span>
          <span>All</span>
        </span>
      </div>
    </div>
  );
}
