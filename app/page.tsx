import type { Metadata } from "next";
import Link from "next/link";
import { ACCENT } from "@/components/accent";
import { REPO_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "cheatsheets",
  description:
    "Personal cheat sheets for the terminal tools I live in — tmux and vim, with my custom bindings up front.",
};

export default function Landing() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-4 py-16 sm:py-24">
      <header className="mb-12">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-pine">
          ~/cheatsheets
        </p>
        <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-text sm:text-6xl">
          cheatsheets
          <span className="cursor-blink text-iris-text">_</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-subtle">
          Personal reference for the terminal tools I live in. My custom
          bindings up front, the defaults noted beside them.
        </p>
      </header>

      <div className="grid flex-1 content-start gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => {
          const a = ACCENT[t.brandAccent];
          return (
            <Link
              key={t.id}
              href={t.basePath}
              className={`group flex flex-col gap-4 rounded-xl border border-overlay bg-surface/70 p-6 transition-colors duration-200 ${a.hoverBorder}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 font-mono text-2xl font-semibold ${a.text}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                  {t.name}
                </span>
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden
                  className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text"
                  fill="currentColor"
                >
                  <path d="M3.5 3.5h5v5h-1.2V5.55L4.3 8.45l-.85-.85 2.9-2.9H3.5Z" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-subtle">{t.tagline}</p>
              <p className="mt-auto font-mono text-xs text-muted">{t.stat}</p>
            </Link>
          );
        })}
      </div>

      <footer className="mt-16 flex items-center justify-between border-t border-overlay pt-6 font-mono text-xs text-muted">
        <span>made by a terminal user</span>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-subtle transition-colors hover:text-text"
        >
          github
        </a>
      </footer>
    </div>
  );
}
