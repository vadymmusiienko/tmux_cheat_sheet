export type Tier = "essential" | "reference";

/** Raw shape as stored in data/<tool>.json. */
export interface RawCommand {
  desc: string;
  cat: string;
  tier?: Tier;
  mine?: boolean;
  keys?: string | string[];
  default?: string;
  /** tmux command-mode equivalents (tmux tool). */
  tmuxcmd?: string[];
  /** vim ex/colon commands, e.g. `:w`, `:bnext` (vim tool). */
  excmd?: string[];
  shell?: string[];
  /** vim mode the mapping applies in, e.g. "NORMAL", "n i v". */
  mode?: string;
  keywords?: string[];
}

/** Normalized command used across the UI. */
export interface Command {
  desc: string;
  cat: string;
  tier: Tier;
  mine: boolean;
  /** Key bindings, always an array (may be empty). */
  keys: string[];
  /** Stock binding this overrides, if any (tmux default / stock vim). */
  default?: string;
  tmuxcmd: string[];
  excmd: string[];
  shell: string[];
  /** vim mode tag; empty string when not applicable. */
  mode: string;
  keywords: string[];
}

export interface Alias {
  name: string;
  command: string;
}

export interface CategoryGroup {
  cat: string;
  accent: AccentColor;
  items: Command[];
}

export type AccentColor =
  | "iris"
  | "foam"
  | "pine"
  | "gold"
  | "rose"
  | "love"
  | "subtle";
