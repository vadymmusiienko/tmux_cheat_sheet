import { CommandCard } from "./CommandCard";
import { ACCENT } from "./accent";
import { slug } from "@/lib/util";
import type { CategoryGroup } from "@/lib/types";

export function CategorySection({ group }: { group: CategoryGroup }) {
  const a = ACCENT[group.accent];
  return (
    <section id={slug(group.cat)} className="scroll-mt-32">
      <header className="mb-4 flex items-center gap-3">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <h2 className="font-display text-lg font-semibold text-text">
          {group.cat}
        </h2>
        <span className="font-mono text-xs text-muted">
          {group.items.length}
        </span>
        <span className="h-px flex-1 bg-overlay" />
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((cmd, i) => (
          <CommandCard
            key={`${cmd.desc}-${i}`}
            cmd={cmd}
            accent={group.accent}
          />
        ))}
      </div>
    </section>
  );
}
