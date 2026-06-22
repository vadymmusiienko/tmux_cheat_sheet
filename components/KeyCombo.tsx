import type { ReactNode } from "react";

const ARROW: Record<string, string> = {
  Left: "←",
  Right: "→",
  Up: "↑",
  Down: "↓",
};
const SEPARATORS = new Set(["or", "/", "...", "then", "·"]);

function Cap({ children }: { children: ReactNode }) {
  return <kbd className="keycap">{children}</kbd>;
}

/** A single chord like `Ctrl-Shift-Left`, rendered as caps joined by +. */
function Chord({ token }: { token: string }) {
  const parts =
    token.length > 1 && token.includes("-") ? token.split("-") : [token];
  return (
    <span className="inline-flex items-center gap-1">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-xs text-muted">+</span>}
          <Cap>{ARROW[p] ?? p}</Cap>
        </span>
      ))}
    </span>
  );
}

/** Render one key string (e.g. `prefix \`, `Ctrl-h / Ctrl-j`). */
export function KeyCombo({ value }: { value: string }) {
  const words = value.split(/\s+/).filter(Boolean);
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {words.map((w, i) => {
        if (w === "prefix") {
          return (
            <kbd
              key={i}
              className="keycap !border-gold/50 !bg-gold !font-semibold !text-ink"
            >
              prefix
            </kbd>
          );
        }
        if (SEPARATORS.has(w)) {
          return (
            <span key={i} className="px-0.5 text-xs text-muted">
              {w}
            </span>
          );
        }
        return <Chord key={i} token={w} />;
      })}
    </span>
  );
}

/** Render a command's full set of alternative key bindings. */
export function KeyComboList({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1.5">
      {keys.map((k, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && <span className="text-xs text-muted">/</span>}
          <KeyCombo value={k} />
        </span>
      ))}
    </span>
  );
}
