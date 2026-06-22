/**
 * Shared motion tokens so every framer entrance eases the same confident way
 * (mirrors --ease-out-quint / --ease-out-expo in globals.css). No bounce, no
 * elastic — deceleration curves only.
 */
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;
