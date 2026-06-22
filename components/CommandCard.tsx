"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyComboList } from "./KeyCombo";
import { ACCENT } from "./accent";
import type { AccentColor, Command } from "@/lib/types";

export function CommandCard({
  cmd,
  accent,
  index = 0,
}: {
  cmd: Command;
  accent: AccentColor;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const a = ACCENT[accent];
  const cmds = [...cmd.tmuxcmd, ...cmd.shell];

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.25,
        delay: reduce ? 0 : Math.min(index, 8) * 0.03,
      }}
      className={`group flex flex-col gap-3 rounded-lg border border-overlay bg-surface/70 p-4 transition-colors duration-200 ${a.hoverBorder}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm leading-snug text-text">{cmd.desc}</p>
        {cmd.mine && (
          <span
            className={`shrink-0 rounded bg-hl-low px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${a.text}`}
          >
            custom
          </span>
        )}
      </div>

      {cmd.keys.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <KeyComboList keys={cmd.keys} />
        </div>
      )}

      {cmd.default && (
        <p className="text-xs text-muted">
          default: <code className="font-mono text-subtle">{cmd.default}</code>
        </p>
      )}

      {cmds.length > 0 && (
        <div className="flex flex-col gap-1">
          {cmds.map((c, i) => (
            <code
              key={i}
              className="block overflow-x-auto rounded bg-base/70 px-2 py-1 font-mono text-xs text-foam"
            >
              {c}
            </code>
          ))}
        </div>
      )}
    </motion.div>
  );
}
