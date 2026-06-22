import rawVim from "@/data/vim.json";
import { buildToolData } from "@/lib/data";
import type { AccentColor, RawCommand } from "@/lib/types";
import type { ThemeMeta, ToolConfig } from "./types";

/** Order categories appear in the vim cheat sheet. */
const CATEGORY_ORDER = [
  "Your Custom",
  "tmux Integration",
  "Modes",
  "Motions",
  "Operators & Edits",
  "Text Objects",
  "Search & Replace",
  "Windows & Buffers",
  "Leader / NvChad",
] as const;

/** Each category gets its own accent, echoing a vim statusline. */
const CATEGORY_ACCENT: Record<string, AccentColor> = {
  "Your Custom": "gold",
  "tmux Integration": "foam",
  Modes: "iris",
  Motions: "pine",
  "Operators & Edits": "foam",
  "Text Objects": "rose",
  "Search & Replace": "love",
  "Windows & Buffers": "subtle",
  "Leader / NvChad": "iris",
};

const THEMES: ThemeMeta[] = [
  { id: "vim-onedark", name: "One Dark", bg: "#282c34", accent: "#98c379" },
  {
    id: "vim-tokyonight",
    name: "Tokyo Night",
    bg: "#1a1b26",
    accent: "#7aa2f7",
  },
  { id: "vim-paper", name: "Paper", bg: "#f6f4ee", accent: "#4d7a2f" },
];

const data = buildToolData(rawVim as RawCommand[], {
  categoryOrder: CATEGORY_ORDER,
  categoryAccent: CATEGORY_ACCENT,
});

export const vimTool: ToolConfig = {
  id: "vim",
  name: "vim",
  basePath: "/vim",
  brandAccent: "foam",
  defaultTheme: "vim-onedark",
  storageKey: "vim-theme",
  themes: THEMES,
  windows: [{ path: "", index: 0, name: "cheat" }],
  hero: {
    kind: "vim",
    eyebrow: "~/.config/nvim",
    title: { lead: "vim, the way ", accent: "I", tail: " use it" },
    subtitle: [
      { t: "My nvim keymaps. The custom " },
      { t: "jk", tone: "foam" },
      { t: " and " },
      { t: "<leader>", tone: "foam" },
      {
        t: " bindings I live in, with the motions and NvChad defaults worth keeping close.",
      },
    ],
  },
  footerPath: "~/.config/nvim/init.lua",
  footerMeta: "nvim · NvChad",
  ...data,
};
