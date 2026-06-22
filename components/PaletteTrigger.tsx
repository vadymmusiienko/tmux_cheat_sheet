"use client";

/**
 * The home page's search affordance. Visually it's the old command-mode bar,
 * but it's a button that opens the global CommandPalette (which also owns the
 * `/` and Cmd/Ctrl-K shortcuts). One search model for the whole site.
 */
export function PaletteTrigger() {
  function open() {
    window.dispatchEvent(new CustomEvent("cmdk:open"));
  }

  return (
    <div className="sticky top-14 z-20 -mx-4 mb-8 border-b border-overlay bg-base/80 px-4 py-4 backdrop-blur">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="/ Meta+K Control+K"
        className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-lg border border-overlay bg-surface px-4 py-3 text-left transition-colors hover:border-hl-high focus-visible:border-iris"
      >
        <span className="select-none font-mono text-iris-text">:</span>
        <span className="flex-1 font-mono text-sm text-subtle">
          fuzzy-find a command, key, or description…
        </span>
        <span className="hidden items-center gap-1 font-mono text-xs text-muted sm:flex">
          <kbd className="keycap">/</kbd>
          <span aria-hidden>or</span>
          <kbd className="keycap">⌘K</kbd>
        </span>
      </button>
    </div>
  );
}
