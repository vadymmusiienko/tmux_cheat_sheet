import type { AccentColor, Alias, CategoryGroup, Command } from "@/lib/types";

export type ToolId = "tmux" | "vim";

/** A selectable theme, shown as a swatch in the ThemeSwitcher. */
export interface ThemeMeta {
  id: string;
  name: string;
  bg: string;
  accent: string;
}

/** A nav tab, rendered status-line style (index + name). */
export interface NavWindow {
  /** Path relative to the tool base; "" is the cheat-sheet index. */
  path: string;
  index: number;
  name: string;
}

/** One run of hero subtitle text, optionally emphasized. */
export interface HeroSegment {
  t: string;
  tone?: "foam" | "gold" | "iris" | "pine";
}

export interface HeroConfig {
  /** Which faux-app visual to render beside the copy. */
  kind: "terminal" | "vim";
  eyebrow: string;
  title: { lead: string; accent: string; tail: string };
  subtitle: HeroSegment[];
}

/**
 * Everything the shared UI needs to render one tool. Plain data only (no
 * functions/components) so it can cross the server→client boundary via context.
 */
export interface ToolConfig {
  id: ToolId;
  /** Brand label, e.g. "tmux" / "vim". */
  name: string;
  /** Route base, e.g. "/tmux". */
  basePath: string;
  brandAccent: AccentColor;
  defaultTheme: string;
  /** localStorage key for this tool's theme choice. */
  storageKey: string;
  themes: ThemeMeta[];
  windows: NavWindow[];
  hero: HeroConfig;
  /** Footer config path, e.g. "~/.config/nvim/init.lua". */
  footerPath: string;
  /** Footer meta, e.g. "tmux 3.6" / "nvim · NvChad". */
  footerMeta: string;
  // ---- derived, render-ready data ----
  commands: Command[];
  essentials: Command[];
  groups: CategoryGroup[];
  categoryAccent: Record<string, AccentColor>;
  /** Optional shell aliases (tmux only, for the /aliases page). */
  aliases?: Alias[];
}

/** Lightweight tool descriptor for the brand switcher + landing hub. */
export interface ToolSummary {
  id: ToolId;
  name: string;
  basePath: string;
  brandAccent: AccentColor;
  tagline: string;
  /** "N commands · M custom" style stat, precomputed. */
  stat: string;
}
