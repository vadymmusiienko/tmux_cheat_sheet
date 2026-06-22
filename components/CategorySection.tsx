"use client";

import { AnimatePresence } from "framer-motion";
import { CommandCard } from "./CommandCard";
import { ACCENT } from "./accent";
import { commandId } from "@/lib/data";
import { slug } from "@/lib/util";
import type { CategoryGroup } from "@/lib/types";

export function CategorySection({ group }: { group: CategoryGroup }) {
  const a = ACCENT[group.accent];
  return (
    <section id={slug(group.cat)} className="scroll-mt-36">
      <header className="mb-4 flex items-center gap-3">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <h2 className="font-display text-lg font-semibold text-text">
          {group.cat}
        </h2>
        <span className="font-mono text-xs text-subtle">
          {group.items.length}
        </span>
        <span className="h-px flex-1 bg-overlay" />
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {group.items.map((cmd, i) => (
            <CommandCard
              key={`${cmd.cat}-${cmd.desc}`}
              cmd={cmd}
              accent={group.accent}
              index={i}
              anchorId={commandId(cmd)}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
