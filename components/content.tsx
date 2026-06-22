import type { ReactNode } from "react";
import { slug } from "@/lib/util";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
}) {
  return (
    <header className="mb-12 border-b border-overlay pb-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-pine">
        {eyebrow}
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-subtle">
        {lead}
      </p>
    </header>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={slug(title)} className="mb-12 scroll-mt-20">
      <h2 className="mb-4 font-display text-2xl font-semibold text-text">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="max-w-2xl leading-relaxed text-subtle">{children}</p>;
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-overlay px-1.5 py-0.5 font-mono text-[0.85em] text-foam">
      {children}
    </code>
  );
}

/** A terminal-pane styled code block with a Rose Pine title bar. */
export function CodeBlock({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-overlay bg-surface">
      <div className="flex items-center gap-1.5 border-b border-overlay bg-base/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-love" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-pine" />
        {title && (
          <span className="ml-2 font-mono text-xs text-muted">{title}</span>
        )}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-text">
        {children}
      </pre>
    </div>
  );
}

export function Callout({
  children,
  accent = "iris",
}: {
  children: ReactNode;
  accent?: "iris" | "gold" | "foam" | "pine" | "rose" | "love";
}) {
  const border = {
    iris: "border-l-iris",
    gold: "border-l-gold",
    foam: "border-l-foam",
    pine: "border-l-pine",
    rose: "border-l-rose",
    love: "border-l-love",
  }[accent];
  return (
    <div
      className={`max-w-2xl rounded-r-md border-l-2 ${border} bg-surface/60 px-4 py-3 text-sm leading-relaxed text-subtle`}
    >
      {children}
    </div>
  );
}

export function FeatureGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function Feature({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-overlay bg-surface/70 p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-base font-semibold text-text">{name}</h3>
        <span className="font-mono text-[11px] uppercase tracking-wide text-pine">
          {role}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-subtle">{children}</p>
    </div>
  );
}
