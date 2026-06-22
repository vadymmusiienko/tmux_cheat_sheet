"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    : "----–--–--";

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

        {/* status-right: date + clock + host pill */}
        <div className="ml-auto hidden shrink-0 items-center gap-3 pl-2 font-mono text-xs text-subtle md:flex">
          <span className="hidden lg:inline">{date}</span>
          <span className="tabular-nums">{time}</span>
          <span className="flex h-7 items-center rounded-md bg-foam px-2.5 font-semibold text-ink">
            rose-pine
          </span>
        </div>
      </nav>
    </header>
  );
}
