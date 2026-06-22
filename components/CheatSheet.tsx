"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { ACCENT } from "@/components/accent";
import { PaletteTrigger } from "@/components/PaletteTrigger";
import { EssentialsSection } from "@/components/EssentialsSection";
import { CategorySection } from "@/components/CategorySection";
import { TerminalHero } from "@/components/TerminalHero";
import { VimHero } from "@/components/VimHero";
import { flashTo } from "@/components/CommandPalette";
import { useTool } from "@/components/ToolContext";
import { slug } from "@/lib/util";
import type { HeroSegment } from "@/lib/tools/types";

const TONE: Record<NonNullable<HeroSegment["tone"]>, string> = {
  foam: "font-mono text-foam",
  gold: "font-mono text-gold-text",
  iris: "font-mono text-iris-text",
  pine: "font-mono text-pine",
};

function Hero() {
  const tool = useTool();
  const { hero } = tool;
  const total = tool.commands.length;
  const custom = tool.commands.filter((c) => c.mine).length;

  return (
    <section className="mb-12 grid items-center gap-10 lg:grid-cols-2">
      <div>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pine">
          {hero.eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl">
          {hero.title.lead}
          <span className="text-gold-text">{hero.title.accent}</span>
          {hero.title.tail}
          <span className="cursor-blink text-iris-text">_</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-subtle">
          {hero.subtitle.map((seg, i) =>
            seg.tone ? (
              <span key={i} className={TONE[seg.tone]}>
                {seg.t}
              </span>
            ) : (
              <span key={i}>{seg.t}</span>
            ),
          )}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-text">{total}</span> commands
          </span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-gold-text">{custom}</span> custom
          </span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            <span className="text-text">{tool.groups.length}</span> categories
          </span>
          <span className="text-muted">·</span>
          <span className="rounded-md bg-hl-low px-2.5 py-1 text-subtle">
            press <kbd className="font-semibold text-foam">/</kbd> to search
          </span>
        </div>
      </div>
      {hero.kind === "vim" ? <VimHero /> : <TerminalHero />}
    </section>
  );
}

function JumpBar() {
  const tool = useTool();
  return (
    <nav className="mb-8 flex flex-wrap gap-2" aria-label="Jump to category">
      <a
        href="#essentials"
        className="rounded-md border border-gold/30 bg-gold/[0.06] px-2.5 py-1 font-mono text-xs text-gold-text transition-colors hover:bg-gold/15"
      >
        essentials
      </a>
      {tool.groups.map((g) => (
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

export function CheatSheet() {
  const tool = useTool();
  const reduce = useReducedMotion();

  // Arriving from another page via <base>/#cmd-… — pulse the target card.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) flashTo(id, Boolean(reduce));
  }, [reduce]);

  return (
    <>
      <Hero />
      <PaletteTrigger />
      <JumpBar />
      <EssentialsSection items={tool.essentials} />
      <div className="flex flex-col gap-12">
        {tool.groups.map((g) => (
          <CategorySection key={g.cat} group={g} />
        ))}
      </div>
    </>
  );
}
