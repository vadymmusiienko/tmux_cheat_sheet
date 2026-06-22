"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Animated session > window > pane diagram. Built from boxes (not raw SVG) so
 * it inherits the active theme's colors.
 */
export function HierarchyDiagram() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const label = "mb-2 font-mono text-[11px] uppercase tracking-wider";
  const pane =
    "rounded-md border border-pine/60 bg-base/50 px-3 py-2 font-mono text-[11px] text-subtle";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-xl border border-iris/50 bg-surface/50 p-4"
    >
      <p className={`${label} text-iris`}>session · main</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {/* window 0 */}
        <motion.div
          variants={item}
          className="rounded-lg border border-foam/50 bg-base/30 p-3"
        >
          <p className={`${label} text-foam`}>window 0 · editor</p>
          <div className="flex gap-2">
            <motion.div variants={item} className={`${pane} flex-1`}>
              nvim
            </motion.div>
            <motion.div variants={item} className={`${pane} w-2/5`}>
              term
            </motion.div>
          </div>
        </motion.div>

        {/* window 1 */}
        <motion.div
          variants={item}
          className="rounded-lg border border-foam/50 bg-base/30 p-3"
        >
          <p className={`${label} text-foam`}>window 1 · server</p>
          <div className="flex flex-col gap-2">
            <motion.div variants={item} className={pane}>
              npm run dev
            </motion.div>
            <motion.div variants={item} className={pane}>
              tail -f logs
            </motion.div>
          </div>
        </motion.div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted">
        one session, two windows, four panes
      </p>
    </motion.div>
  );
}
