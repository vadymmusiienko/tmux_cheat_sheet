import rawTmux from "@/data/tmux.json";
import rawAliases from "@/data/aliases.json";
import { buildToolData } from "@/lib/data";
import type { AccentColor, Alias, RawCommand } from "@/lib/types";
import type { ThemeMeta, ToolConfig } from "./types";

/** Order categories appear in the cheat sheet. */
const CATEGORY_ORDER = [
  "Sessions",
  "Windows",
  "Panes",
  "Copy Mode",
  "Plugins",
  "Misc",
  "Help",
] as const;

/** Each category gets its own accent, echoing tmux's colored status. */
const CATEGORY_ACCENT: Record<string, AccentColor> = {
  Sessions: "iris",
  Windows: "foam",
  Panes: "pine",
  "Copy Mode": "gold",
  Plugins: "rose",
  Misc: "subtle",
  Help: "love",
};

const THEMES: ThemeMeta[] = [
  {
    id: "gruvbox-dark",
    name: "Gruvbox Dark",
    bg: "#282828",
    accent: "#fabd2f",
  },
  {
    id: "gruvbox-light",
    name: "Gruvbox Light",
    bg: "#fbf1c7",
    accent: "#966111",
  },
  { id: "rose-pine", name: "Rose Pine", bg: "#191724", accent: "#c4a7e7" },
  {
    id: "rose-pine-dawn",
    name: "Rose Pine Dawn",
    bg: "#faf4ed",
    accent: "#907aa9",
  },
];

const data = buildToolData(rawTmux as RawCommand[], {
  categoryOrder: CATEGORY_ORDER,
  categoryAccent: CATEGORY_ACCENT,
});

export const tmuxTool: ToolConfig = {
  id: "tmux",
  name: "tmux",
  basePath: "/tmux",
  brandAccent: "gold",
  defaultTheme: "gruvbox-dark",
  storageKey: "tmux-theme",
  themes: THEMES,
  windows: [
    { path: "", index: 0, name: "cheat" },
    { path: "/getting-started", index: 1, name: "setup" },
    { path: "/configuration", index: 2, name: "config" },
    { path: "/plugins", index: 3, name: "plugins" },
    { path: "/aliases", index: 4, name: "aliases" },
  ],
  hero: {
    kind: "terminal",
    eyebrow: "~/.config/tmux",
    title: { lead: "tmux, the way ", accent: "I", tail: " use it" },
    subtitle: [
      {
        t: "My personal cheat sheet. Every shortcut and command, with my custom ",
      },
      { t: "Ctrl-Space", tone: "foam" },
      {
        t: " bindings up front and the tmux defaults noted right beside them.",
      },
    ],
  },
  footerPath: "~/.config/tmux/tmux.conf",
  footerMeta: "tmux 3.6",
  ...data,
  aliases: rawAliases as Alias[],
};
