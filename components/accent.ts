import type { AccentColor } from "@/lib/types";

/**
 * Full, static Tailwind class strings per accent (so the JIT compiler keeps them).
 * Each tmux category maps to one Rose Pine accent.
 */
export const ACCENT: Record<
  AccentColor,
  { dot: string; text: string; hoverBorder: string; ring: string }
> = {
  iris: {
    dot: "bg-iris",
    text: "text-iris",
    hoverBorder: "hover:border-iris/60",
    ring: "bg-iris/12",
  },
  foam: {
    dot: "bg-foam",
    text: "text-foam",
    hoverBorder: "hover:border-foam/60",
    ring: "bg-foam/12",
  },
  pine: {
    dot: "bg-pine",
    text: "text-pine",
    hoverBorder: "hover:border-pine/70",
    ring: "bg-pine/15",
  },
  gold: {
    dot: "bg-gold",
    text: "text-gold",
    hoverBorder: "hover:border-gold/60",
    ring: "bg-gold/12",
  },
  rose: {
    dot: "bg-rose",
    text: "text-rose",
    hoverBorder: "hover:border-rose/60",
    ring: "bg-rose/12",
  },
  love: {
    dot: "bg-love",
    text: "text-love",
    hoverBorder: "hover:border-love/60",
    ring: "bg-love/12",
  },
  subtle: {
    dot: "bg-subtle",
    text: "text-subtle",
    hoverBorder: "hover:border-subtle/60",
    ring: "bg-subtle/12",
  },
};
