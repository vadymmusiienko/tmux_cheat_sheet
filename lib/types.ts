export type Tier = "essential" | "reference";

/** Raw shape as stored in data/tmux.json. */
export interface RawCommand {
  desc: string;
  cat: string;
  tier?: Tier;
  mine?: boolean;
  keys?: string | string[];
  default?: string;
  tmuxcmd?: string[];
  shell?: string[];
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
  /** Stock tmux binding this overrides, if any. */
  default?: string;
  tmuxcmd: string[];
  shell: string[];
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
