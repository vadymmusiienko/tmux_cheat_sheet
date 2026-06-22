import { CommandCard } from "./CommandCard";
import { accentFor } from "@/lib/data";
import type { Command } from "@/lib/types";

export function EssentialsSection({ items }: { items: Command[] }) {
  if (items.length === 0) return null;
  return (
    <section id="essentials" className="mb-12 scroll-mt-36">
      <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="font-display text-lg font-semibold text-gold-text">
          Essentials
        </h2>
        <p className="text-sm text-subtle">
          the bindings I reach for every day
        </p>
        <span className="h-px flex-1 bg-overlay" />
      </header>
      <div className="rounded-xl border border-gold/20 bg-gold/[0.04] p-3 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cmd, i) => (
            <CommandCard
              key={`${cmd.desc}-${i}`}
              cmd={cmd}
              accent={accentFor(cmd.cat)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
