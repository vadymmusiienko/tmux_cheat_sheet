"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const REPO_URL = "https://github.com/vadymmusiienko/tmux_cheat_sheet/";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** Nav tabs rendered as tmux "windows" (index + name), like the status line. */
const WINDOWS = [
  { href: "/", index: 0, name: "cheat" },
  { href: "/getting-started", index: 1, name: "setup" },
  { href: "/configuration", index: 2, name: "config" },
  { href: "/plugins", index: 3, name: "plugins" },
  { href: "/aliases", index: 4, name: "aliases" },
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function TopNav() {
  const pathname = usePathname();
  const now = useClock();
  const time = now
    ? now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";
  const date = now
    ? now.toLocaleDateString("en-CA") // YYYY-MM-DD, matches status-right
    : "----------";

  return (
    <header className="sticky top-0 z-30 border-b border-overlay bg-base/85 backdrop-blur">
      <nav className="mx-auto flex h-12 max-w-6xl items-center gap-1 px-2 sm:px-4">
        {/* status-left: session pill (#S), powerline tail */}
        <Link
          href="/"
          className="group flex shrink-0 items-center"
          aria-label="tmux cheat sheet home"
        >
          <span className="flex h-7 items-center rounded-l-md bg-gold px-2.5 font-mono text-sm font-semibold text-ink">
            tmux
          </span>
          <span
            aria-hidden
            className="h-7 w-0 border-y-[14px] border-l-[10px] border-y-transparent border-l-gold"
          />
        </Link>

        {/* windows */}
        <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {WINDOWS.map((w) => {
            const active = pathname === w.href;
            return (
              <li key={w.href} className="shrink-0">
                <Link
                  href={w.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex items-center gap-1.5 rounded-md bg-rose px-2.5 py-1 font-mono text-sm font-medium text-ink"
                      : "flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-sm text-subtle transition-colors hover:bg-overlay hover:text-text"
                  }
                >
                  <span className={active ? "text-ink/70" : "text-muted"}>
                    {w.index}
                  </span>
                  {w.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* status-right: date + clock + theme switcher + repo link */}
        <div className="ml-auto flex shrink-0 items-center gap-2 pl-2 sm:gap-3">
          <div className="hidden items-center gap-3 font-mono text-xs text-subtle md:flex">
            <span className="hidden lg:inline">{date}</span>
            <span className="tabular-nums">{time}</span>
          </div>
          <ThemeSwitcher />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-overlay bg-surface text-subtle transition-colors hover:border-hl-high hover:text-text"
          >
            <GitHubIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
