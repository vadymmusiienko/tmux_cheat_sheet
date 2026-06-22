"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

function PaneBody({
  path,
  lines,
  active = false,
  cursor = false,
}: {
  path: string;
  lines: { text: string; tone?: string }[];
  active?: boolean;
  cursor?: boolean;
}) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-md border bg-base/40 p-2 ${
        active ? "border-pine/70" : "border-overlay"
      }`}
    >
      <div className="mb-1 truncate pr-12 font-mono text-[10px] text-muted">
        {path}
      </div>
      <div className="flex flex-col gap-0.5 font-mono text-[11px] leading-snug">
        {lines.map((l, i) => (
          <span key={i} className={l.tone ?? "text-subtle"}>
            {l.text}
          </span>
        ))}
        {cursor && (
          <span className="text-foam">
            $ <span className="cursor-blink">_</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function TerminalHero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.55,
        delayChildren: reduce ? 0 : 0.25,
      },
    },
  };
  const pane: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: EASE_OUT_EXPO },
    },
  };
  const tag: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="overflow-hidden rounded-xl border border-overlay bg-surface/70 shadow-xl shadow-black/20">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-overlay bg-base/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-love" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-pine" />
        <span className="ml-2 font-mono text-xs text-muted">tmux ~ main</span>
      </div>

      {/* panes */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex h-52 gap-1.5 p-1.5 sm:h-60"
      >
        <motion.div variants={pane} className="relative flex-1">
          <PaneBody
            path="~/dev/app"
            lines={[
              { text: "$ nvim src/app.tsx", tone: "text-foam" },
              { text: "  export default App", tone: "text-subtle" },
              { text: "  return <Layout/>", tone: "text-subtle" },
              { text: "  // 1 of 3 panes", tone: "text-muted" },
            ]}
          />
        </motion.div>

        <div className="flex w-[44%] flex-col gap-1.5">
          <motion.div variants={pane} className="relative flex-1">
            <span className="absolute -right-1 -top-2 z-10">
              <motion.span variants={tag} className="keycap !text-[10px]">
                prefix \
              </motion.span>
            </span>
            <PaneBody
              path="~/dev/app · logs"
              lines={[
                { text: "$ tail -f dev.log", tone: "text-foam" },
                { text: "  GET / 200", tone: "text-subtle" },
                { text: "  GET /api 200", tone: "text-subtle" },
              ]}
            />
          </motion.div>

          <motion.div variants={pane} className="relative flex-1">
            <span className="absolute -right-1 -top-2 z-10">
              <motion.span variants={tag} className="keycap !text-[10px]">
                prefix -
              </motion.span>
            </span>
            <PaneBody
              path="~/dev/app · server"
              active
              cursor
              lines={[
                { text: "$ npm run dev", tone: "text-foam" },
                { text: "  ready :3000", tone: "text-pine" },
              ]}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* status line, echoing tmux.conf */}
      <div className="flex items-center gap-2 border-t border-overlay bg-base/50 px-3 py-1.5 font-mono text-xs">
        <span className="rounded bg-gold px-2 py-0.5 font-semibold text-ink">
          main
        </span>
        <span className="truncate text-muted">0:app 1:logs 2:server</span>
        <span className="ml-auto tabular-nums text-subtle">100%</span>
      </div>
    </div>
  );
}
