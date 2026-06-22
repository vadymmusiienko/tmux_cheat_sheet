"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { commands, essentials, groupByCategory } from "@/lib/data";
import { ACCENT } from "@/components/accent";
import { PaletteTrigger } from "@/components/PaletteTrigger";
import { EssentialsSection } from "@/components/EssentialsSection";
import { CategorySection } from "@/components/CategorySection";
import { TerminalHero } from "@/components/TerminalHero";
import { flashTo } from "@/components/CommandPalette";
import { slug } from "@/lib/util";

const TOTAL = commands.length;
const CUSTOM = commands.filter((c) => c.mine).length;
const ALL_GROUPS = groupByCategory(commands);

function Hero() {
  return (
    <section className="mb-12 grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pine">
          ~/.config/tmux
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl">
          tmux, the way <span className="text-gold-text">I</span> use it
          <span className="cursor-blink text-iris-text">_</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-subtle">
          My personal cheat sheet. Every shortcut and command, with my custom{" "}
          <span className="font-mono text-foam">Ctrl-Space</span> bindings up
          front and the tmux defaults noted right beside them.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-text">{TOTAL}</span> commands
          </span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-gold-text">{CUSTOM}</span> custom
          </span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-text">{ALL_GROUPS.length}</span> categories
          </span>
          <span className="text-muted">·</span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            press <kbd className="font-semibold text-foam">/</kbd> to search
          </span>
        </div>
      </div>
      <TerminalHero />
    </section>
  );
}

function JumpBar() {
  return (
    <nav className="mb-8 flex flex-wrap gap-2" aria-label="Jump to category">
      <a
        href="#essentials"
        className="rounded-md border border-gold/30 bg-gold/[0.06] px-2.5 py-1 font-mono text-xs text-gold-text transition-colors hover:bg-gold/15"
      >
        essentials
      </a>
      {ALL_GROUPS.map((g) => (
        <a
          key={g.cat}
          href={`#${slug(g.cat)}`}
          className="rounded-md border border-overlay bg-surface/60 px-2.5 py-1 font-mono text-xs text-subtle transition-colors hover:border-hl-high hover:text-text"
        >
          <span
            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${ACCENT[g.accent].dot}`}
          />
          {g.cat.toLowerCase()}
        </a>
      ))}
    </nav>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  // Arriving from another page via /#cmd-… — pulse the target card.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) flashTo(id, Boolean(reduce));
  }, [reduce]);

  return (
    <>
      <Hero />
      <PaletteTrigger />
      <JumpBar />
      <EssentialsSection items={essentials} />
      <div className="flex flex-col gap-12">
        {ALL_GROUPS.map((g) => (
          <CategorySection key={g.cat} group={g} />
        ))}
      </div>
    </>
  );
}
