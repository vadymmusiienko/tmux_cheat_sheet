import type { AccentColor } from "@/lib/types";

/**
 * Full, static Tailwind class strings per accent (so the JIT compiler keeps them).
 * Each category maps to one accent; `solid`/`borderL` drive the brand pill.
 */
export const ACCENT: Record<
  AccentColor,
  {
    dot: string;
    text: string;
    hoverBorder: string;
    ring: string;
    solid: string;
    borderL: string;
  }
> = {
  iris: {
    dot: "bg-iris",
    text: "text-iris",
    hoverBorder: "hover:border-iris/60",
    ring: "bg-iris/12",
    solid: "bg-iris",
    borderL: "border-l-iris",
  },
  foam: {
    dot: "bg-foam",
    text: "text-foam",
    hoverBorder: "hover:border-foam/60",
    ring: "bg-foam/12",
    solid: "bg-foam",
    borderL: "border-l-foam",
  },
  pine: {
    dot: "bg-pine",
    text: "text-pine",
    hoverBorder: "hover:border-pine/70",
    ring: "bg-pine/15",
    solid: "bg-pine",
    borderL: "border-l-pine",
  },
  gold: {
    dot: "bg-gold",
    text: "text-gold",
    hoverBorder: "hover:border-gold/60",
    ring: "bg-gold/12",
    solid: "bg-gold",
    borderL: "border-l-gold",
  },
  rose: {
    dot: "bg-rose",
    text: "text-rose",
    hoverBorder: "hover:border-rose/60",
    ring: "bg-rose/12",
    solid: "bg-rose",
    borderL: "border-l-rose",
  },
  love: {
    dot: "bg-love",
    text: "text-love",
    hoverBorder: "hover:border-love/60",
    ring: "bg-love/12",
    solid: "bg-love",
    borderL: "border-l-love",
  },
  subtle: {
    dot: "bg-subtle",
    text: "text-subtle",
    hoverBorder: "hover:border-subtle/60",
    ring: "bg-subtle/12",
    solid: "bg-subtle",
    borderL: "border-l-subtle",
  },
};
