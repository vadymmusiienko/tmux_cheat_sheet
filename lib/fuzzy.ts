import type { Command } from "./types";

/**
 * fzf / Telescope-style subsequence scorer. Matches every query character in
 * order against the text, rewarding consecutive runs and word boundaries so
 * "spl" ranks "split-window" above "set-option ... pane-list". Returns the
 * matched character indices (for highlighting) or null when the query doesn't
 * fully match.
 */
export interface FuzzyMatch {
  score: number;
  positions: number[];
}

const BOUNDARY = /[\s\-_/.:()]/;

export function fuzzyScore(query: string, text: string): FuzzyMatch | null {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return { score: 0, positions: [] };
  if (q.length > t.length) return null;

  let qi = 0;
  let score = 0;
  let run = 0;
  let prev = -2;
  const positions: number[] = [];

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] !== q[qi]) continue;
    let s = 2;
    if (ti === prev + 1) {
      run += 1;
      s += run * 5; // consecutive run bonus, compounding
    } else {
      run = 0;
    }
    if (ti === 0 || BOUNDARY.test(t[ti - 1])) s += 8; // start of a word
    score += s;
    positions.push(ti);
    prev = ti;
    qi += 1;
  }

  if (qi < q.length) return null; // not every query char matched
  score -= positions[0] * 0.5; // earlier first match is better
  score -= (t.length - q.length) * 0.1; // shorter, tighter matches win
  return { score, positions };
}

/**
 * Score a command for the palette. Highlight positions track the visible label
 * (`desc`); keys, category, and raw commands contribute to ranking only, so
 * searching "C-b" or "swap" surfaces the right card without a desc match.
 */
export function scoreCommand(query: string, cmd: Command): FuzzyMatch | null {
  const q = query.trim();
  if (!q) return { score: 0, positions: [] };

  const desc = fuzzyScore(q, cmd.desc);

  // Secondary fields rank only; take the best of keys / default / cat / cmds.
  const secondary = [
    cmd.cat,
    cmd.default ?? "",
    ...cmd.keys,
    ...cmd.tmuxcmd,
    ...cmd.shell,
    ...cmd.keywords,
  ];
  let secondaryScore = -Infinity;
  for (const field of secondary) {
    const m = fuzzyScore(q, field);
    if (m) secondaryScore = Math.max(secondaryScore, m.score);
  }

  let score = -Infinity;
  let positions: number[] = [];
  if (desc) {
    score = desc.score;
    positions = desc.positions;
  }
  if (secondaryScore > -Infinity) {
    // Desc matches are worth more than buried metadata matches.
    score = Math.max(score, secondaryScore * 0.75);
  }
  if (score === -Infinity) return null;

  if (cmd.tier === "essential") score += 6;
  if (cmd.mine) score += 3;
  return { score, positions };
}
