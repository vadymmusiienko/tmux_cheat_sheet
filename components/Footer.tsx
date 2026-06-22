"use client";

import Link from "next/link";
import { REPO_URL } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import { useTool } from "./ToolContext";

export function Footer() {
  const tool = useTool();
  return (
    <footer className="mt-20 border-t border-overlay">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          <span className="text-pine">{tool.footerPath}</span> ·{" "}
          {tool.footerMeta}
        </p>
        <nav className="flex items-center gap-4 font-mono">
          {TOOLS.map((t) => {
            const active = t.id === tool.id;
            return (
              <Link
                key={t.id}
                href={t.basePath}
                aria-current={active ? "page" : undefined}
                className={`transition-colors hover:text-text ${
                  active ? "text-text" : "text-subtle"
                }`}
              >
                {t.name}
              </Link>
            );
          })}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle transition-colors hover:text-text"
          >
            github
          </a>
        </nav>
      </div>
    </footer>
  );
}
