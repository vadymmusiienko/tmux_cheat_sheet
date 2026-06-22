import { slug } from "./util";
import type { AccentColor, CategoryGroup, Command, RawCommand } from "./types";

/**
 * Stable DOM anchor for a command's canonical (category) card. The same
 * command also renders inside Essentials, so only the category copy carries
 * this id — keeping it unique and making it the palette's jump target. The
 * tool id is part of the prefix so tmux and vim anchors never collide.
 */
export function commandId(toolId: string, cmd: Command): string {
  return `cmd-${toolId}-${slug(`${cmd.cat}-${cmd.desc}`)}`;
}

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
    excmd: raw.excmd ?? [],
    shell: raw.shell ?? [],
    mode: raw.mode ?? "",
    keywords: raw.keywords ?? [],
  };
}

/** Derived, render-ready data for a single tool (tmux, vim, …). */
export interface ToolData {
  commands: Command[];
  essentials: Command[];
  groups: CategoryGroup[];
  /** Category → accent map, so components can resolve an accent by name. */
  categoryAccent: Record<string, AccentColor>;
}

/**
 * Normalize a tool's raw commands and group them by category in the canonical
 * order (unknown categories are appended in first-seen order). Each category
 * carries its accent.
 */
export function buildToolData(
  raw: RawCommand[],
  opts: {
    categoryOrder: readonly string[];
    categoryAccent: Record<string, AccentColor>;
  },
): ToolData {
  const commands = raw.map(normalize);
  const accentFor = (cat: string): AccentColor =>
    opts.categoryAccent[cat] ?? "subtle";

  const known = opts.categoryOrder;
  const cats = [
    ...known.filter((c) => commands.some((cmd) => cmd.cat === c)),
    ...Array.from(new Set(commands.map((c) => c.cat))).filter(
      (c) => !known.includes(c),
    ),
  ];
  const groups: CategoryGroup[] = cats.map((cat) => ({
    cat,
    accent: accentFor(cat),
    items: commands.filter((c) => c.cat === cat),
  }));

  return {
    commands,
    essentials: commands.filter((c) => c.tier === "essential"),
    groups,
    categoryAccent: opts.categoryAccent,
  };
}

/** Case-insensitive substring search across every searchable field. */
export function searchCommands(query: string, list: Command[]): Command[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((c) => {
    const haystack = [
      c.desc,
      c.cat,
      c.default ?? "",
      c.mode,
      ...c.keys,
      ...c.tmuxcmd,
      ...c.excmd,
      ...c.shell,
      ...c.keywords,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
