"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { commandId } from "@/lib/data";
import { scoreCommand } from "@/lib/fuzzy";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { ACCENT } from "./accent";
import { KeyCombo } from "./KeyCombo";
import { useTool } from "./ToolContext";
import type { Command } from "@/lib/types";

const MAX_RESULTS = 50;

interface Ranked {
  cmd: Command;
  positions: number[];
}

/** Render a command description with fuzzy-matched characters lifted out. */
function Highlight({
  text,
  positions,
  active,
}: {
  text: string;
  positions: number[];
  active: boolean;
}) {
  if (positions.length === 0) {
    return <span className={active ? "text-text" : "text-subtle"}>{text}</span>;
  }
  const set = new Set(positions);
  return (
    <span className={active ? "text-text" : "text-subtle"}>
      {Array.from(text).map((ch, i) =>
        set.has(i) ? (
          <span key={i} className="font-semibold text-foam">
            {ch}
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}

export function CommandPalette() {
  const tool = useTool();
  const commands = tool.commands;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const results: Ranked[] = useMemo(() => {
    const q = query.trim();
    if (!q) {
      // Resting state: the everyday bindings, in source order.
      return commands
        .filter((c) => c.tier === "essential")
        .map((cmd) => ({ cmd, positions: [] }));
    }
    return commands
      .map((cmd) => ({ cmd, m: scoreCommand(q, cmd) }))
      .filter((r): r is { cmd: Command; m: NonNullable<typeof r.m> } =>
        Boolean(r.m),
      )
      .sort((a, b) => b.m.score - a.m.score)
      .slice(0, MAX_RESULTS)
      .map(({ cmd, m }) => ({ cmd, positions: m.positions }));
  }, [query, commands]);

  // Reset the highlight to the top whenever the query changes (render-time
  // reset, the React-recommended pattern — no effect needed).
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSelected(0);
  }

  // Keep the selected row scrolled into view as it changes.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${selected}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selected, open, results]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    restoreFocus.current?.focus?.();
  }, []);

  const jump = useCallback(
    (cmd: Command) => {
      const id = commandId(tool.id, cmd);
      close();
      if (pathname === tool.basePath) {
        flashTo(id, Boolean(reduce));
      } else {
        // Land on the cheat-sheet grid, then let it flash the target on arrival.
        router.push(`${tool.basePath}#${id}`);
      }
    },
    [close, pathname, router, reduce, tool.id, tool.basePath],
  );

  // Global open triggers: `/`, Cmd/Ctrl-K, and the visible launcher button.
  useEffect(() => {
    function onOpen() {
      restoreFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing =
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else onOpen();
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        onOpen();
      }
    }
    window.addEventListener("cmdk:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("cmdk:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Focus the input and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function onListKey(e: React.KeyboardEvent) {
    const n = results.length;
    if (n === 0) return;
    const next = (d: number) => setSelected((s) => (s + d + n) % n);
    if (
      e.key === "ArrowDown" ||
      (e.ctrlKey && (e.key === "j" || e.key === "n"))
    ) {
      e.preventDefault();
      next(1);
    } else if (
      e.key === "ArrowUp" ||
      (e.ctrlKey && (e.key === "k" || e.key === "p"))
    ) {
      e.preventDefault();
      next(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[selected];
      if (r) jump(r.cmd);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-modal flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 cursor-default bg-base/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command search"
            onKeyDown={onListKey}
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{
              duration: reduce ? 0 : 0.18,
              ease: EASE_OUT_EXPO,
            }}
            className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-hl-high bg-surface shadow-2xl shadow-black/40"
          >
            {/* command-mode prompt */}
            <div className="flex items-center gap-3 border-b border-overlay px-4 py-3">
              <span className="select-none font-mono text-iris-text">:</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="fuzzy-find a command, key, or description…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded
                aria-controls="cmdk-list"
                aria-activedescendant={
                  results[selected] ? `cmdk-opt-${selected}` : undefined
                }
                className="w-full bg-transparent font-mono text-sm text-text placeholder:text-subtle focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="shrink-0 font-mono text-xs tabular-nums text-subtle">
                {query.trim() ? `${results.length}` : commands.length}
              </span>
            </div>

            {/* results */}
            <div
              ref={listRef}
              id="cmdk-list"
              role="listbox"
              aria-label="Commands"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5"
            >
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center font-mono text-sm text-subtle">
                  <span className="text-iris-text">:</span> no commands match{" "}
                  <span className="text-text">{query}</span>
                </p>
              ) : (
                results.map((r, i) => {
                  const active = i === selected;
                  const accent =
                    ACCENT[tool.categoryAccent[r.cmd.cat] ?? "subtle"];
                  return (
                    <button
                      key={commandId(tool.id, r.cmd) + i}
                      type="button"
                      role="option"
                      id={`cmdk-opt-${i}`}
                      data-index={i}
                      aria-selected={active}
                      onMouseMove={() => setSelected(i)}
                      onClick={() => jump(r.cmd)}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
                        active ? "bg-overlay" : "bg-transparent"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`font-mono text-sm ${
                          active ? "text-iris-text" : "text-transparent"
                        }`}
                      >
                        ›
                      </span>
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                      />
                      <span className="min-w-0 flex-1 truncate text-sm">
                        <Highlight
                          text={r.cmd.desc}
                          positions={r.positions}
                          active={active}
                        />
                      </span>
                      {r.cmd.mine && (
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-gold-text">
                          custom
                        </span>
                      )}
                      {r.cmd.keys[0] && (
                        <span className="hidden shrink-0 sm:flex">
                          <KeyCombo value={r.cmd.keys[0]} />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* hint footer, echoing a tmux status line */}
            <div className="flex items-center gap-3 border-t border-overlay bg-base/40 px-4 py-2 font-mono text-[11px] text-muted">
              <Hint keys="↑↓" label="move" />
              <Hint keys="⏎" label="jump" />
              <Hint keys="esc" label="close" />
              <span className="ml-auto hidden text-subtle sm:inline">
                fuzzy command finder
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Hint({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <kbd className="rounded bg-overlay px-1.5 py-0.5 text-text">{keys}</kbd>
      <span>{label}</span>
    </span>
  );
}

/** Smooth-scroll to a command card and pulse it. Honors reduced motion. */
export function flashTo(id: string, reduce: boolean) {
  // Defer a frame so the palette has unmounted and layout is settled.
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
    el.classList.remove("cmd-flash");
    // reflow to restart the animation if it's already applied
    void el.offsetWidth;
    el.classList.add("cmd-flash");
    window.setTimeout(() => el.classList.remove("cmd-flash"), 1400);
  });
}
