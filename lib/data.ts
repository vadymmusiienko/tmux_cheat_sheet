import rawTmux from "@/data/tmux.json";
import rawAliases from "@/data/aliases.json";
import { slug } from "./util";
import type {
  AccentColor,
  Alias,
  CategoryGroup,
  Command,
  RawCommand,
} from "./types";

/**
 * Stable DOM anchor for a command's canonical (category) card. The same
 * command also renders inside Essentials, so only the category copy carries
 * this id — keeping it unique and making it the palette's jump target.
 */
export function commandId(cmd: Command): string {
  return `cmd-${slug(`${cmd.cat}-${cmd.desc}`)}`;
}

/** Order categories appear in the cheat sheet (mirrors build.py / the README). */
export const CATEGORY_ORDER = [
  "Sessions",
  "Windows",
  "Panes",
  "Copy Mode",
  "Plugins",
  "Misc",
  "Help",
] as const;

/** Each category gets its own Rose Pine accent, echoing tmux's colored status. */
export const CATEGORY_ACCENT: Record<string, AccentColor> = {
  Sessions: "iris",
  Windows: "foam",
  Panes: "pine",
  "Copy Mode": "gold",
  Plugins: "rose",
  Misc: "subtle",
  Help: "love",
};

function normalize(raw: RawCommand): Command {
  const keys =
    raw.keys === undefined
      ? []
      : Array.isArray(raw.keys)
        ? raw.keys
        : [raw.keys];
  return {
    desc: raw.desc,
    cat: raw.cat,
    tier: raw.tier ?? "reference",
    mine: raw.mine ?? false,
    keys,
    default: raw.default,
    tmuxcmd: raw.tmuxcmd ?? [],
    shell: raw.shell ?? [],
    keywords: raw.keywords ?? [],
  };
}

export const commands: Command[] = (rawTmux as RawCommand[]).map(normalize);

export const aliases: Alias[] = rawAliases as Alias[];

export const essentials: Command[] = commands.filter(
  (c) => c.tier === "essential",
);

export function accentFor(cat: string): AccentColor {
  return CATEGORY_ACCENT[cat] ?? "subtle";
}

/** Group commands by category in the canonical order. */
export function groupByCategory(list: Command[] = commands): CategoryGroup[] {
  const known = CATEGORY_ORDER as readonly string[];
  const cats = [
    ...known.filter((c) => list.some((cmd) => cmd.cat === c)),
    ...Array.from(new Set(list.map((c) => c.cat))).filter(
      (c) => !known.includes(c),
    ),
  ];
  return cats.map((cat) => ({
    cat,
    accent: accentFor(cat),
    items: list.filter((c) => c.cat === cat),
  }));
}

/** Case-insensitive substring search across every searchable field. */
export function searchCommands(
  query: string,
  list: Command[] = commands,
): Command[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((c) => {
    const haystack = [
      c.desc,
      c.cat,
      c.default ?? "",
      ...c.keys,
      ...c.tmuxcmd,
      ...c.shell,
      ...c.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
