---
name: tmux cheat sheet
description: A personal, terminal-native tmux cheat sheet — dotfiles turned into a website.
colors:
  # Default theme = Gruvbox Dark (set on <html data-theme="gruvbox-dark">).
  # Components only ever reference these semantic roles; each of the four
  # palettes supplies its own values via html[data-theme]. See the Colors
  # section for the per-theme values.
  base: "#282828"
  ink: "#1d2021"
  surface: "#32302f"
  overlay: "#3c3836"
  muted: "#9b8e80"
  subtle: "#a89984"
  text: "#ebdbb2"
  love: "#fb4934"
  gold: "#fabd2f"
  rose: "#fe8019"
  pine: "#83a598"
  foam: "#8ec07c"
  iris: "#d3869b"
  # text-legible accent shades (= accent on dark themes, darker on light themes)
  gold-text: "#fabd2f"
  rose-text: "#fe8019"
  iris-text: "#d3869b"
  hl-low: "#32302f"
  hl-med: "#3c3836"
  hl-high: "#504945"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
components:
  keycap:
    backgroundColor: "{colors.overlay}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.15rem 0.45rem"
  keycap-prefix:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.15rem 0.45rem"
  command-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "16px"
  command-card-code:
    backgroundColor: "{colors.base}"
    textColor: "{colors.foam}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"
  custom-pill:
    backgroundColor: "{colors.hl-low}"
    textColor: "{colors.gold}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"
  nav-tab-active:
    backgroundColor: "{colors.rose}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  search-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
---

# Design System: tmux cheat sheet

## 1. Overview

**Creative North Star: "The Lived-In Config"**

This is not a website about tmux; it is a tmux setup that happens to live in a
browser. The whole system answers to one idea — a power user's dotfiles, ported
to the web with the same care they'd give their `.tmux.conf`. The top nav is a
status line. Search is command mode. Command cards read like panes. Single keys
are physical keycaps. Nothing here is decorated to look "techy"; it borrows the
tool's own grammar because the author actually lives in that grammar.

The mood is dark, calm, and tiled by default. Surfaces step up in tone rather
than float on shadows — `base` → `surface` → `overlay` → highlight rows — the
way a terminal stacks panes and splits, not the way a SaaS dashboard stacks
cards. Density is comfortable, not cramped: generous line-height on body copy,
tight rhythm inside cards, a three-up grid that collapses cleanly. Color does
the categorizing work (each command group owns one accent), and the four
switchable palettes are treated as _colorschemes_, a first-class feature, not a
gimmick toggle.

What this system explicitly rejects: the **dense docs wall** (no man-page text
dumps — everything is a scannable card with real hierarchy), the
**over-animated / flashy** reflex (motion is a cursor blink and a quiet
fade-up, never bounce), and the **generic SaaS landing** (no gradient hero, no
feature-card grid, no hero-metric blocks, no marketing eyebrows). It is a tool
with a point of view, not a product pitch.

**Key Characteristics:**

- Terminal-native chrome: status-line nav, command-mode search, panes-as-cards.
- Semantic-token theming — components never name a hex, only a role.
- Four real palettes (Gruvbox Dark default, Rose Pine, Rose Pine Dawn, Gruvbox Light).
- Flat by default; depth comes from tonal layering, not shadows.
- Monospace is earned here — the subject _is_ the terminal.

## 2. Colors

A semantic role system painted by four well-known terminal palettes. Components
only ever reference roles (`base`, `surface`, `pine`, `gold`, …); each theme
supplies the values via `html[data-theme]`. The frontmatter carries the default
theme's values (Gruvbox Dark); the per-theme hexes for every role live in
`app/globals.css` and in the sidecar's tonal metadata.

### Primary

- **Pane Background** `base` (Gruvbox Dark `#282828`, Rose Pine `#191724`, Rose Pine Dawn `#faf4ed`, Gruvbox Light `#fbf1c7`): the body canvas and the deepest layer. Code blocks sit on a 70% wash of it inside cards.
- **Reading Ink** `text` (`#ebdbb2` / `#e0def4` / `#575279` / `#3c3836`): primary body and heading color. Always the highest-contrast role against `base` — the contrast floor (≥4.5:1) is held on all four themes, including the two light ones.

### Secondary — the accent set

Seven palette colors double as the per-category accent system (`components/accent.ts`). Each command group is assigned one; it appears as a leading dot, the "custom" pill dot, and the card's hover border. Order below is `gruvbox-dark / rose-pine / rose-pine-dawn / gruvbox-light`.

- **gold** (`#fabd2f` / `#f6c177` / `#ea9d34` / `#966111`): the signature accent. Carries the `prefix` keycap, the essentials jump-pill, custom-binding highlights, and the hero's "I".
- **rose** (`#fe8019` / `#ebbcba` / `#d7827e` / `#af3a03`): the active nav window (status-line current-window highlight).
- **iris** (`#d3869b` / `#c4a7e7` / `#907aa9` / `#8f3f71`): focus rings, text selection, the command-mode `:` prompt.
- **foam** (`#8ec07c` / `#9ccfd8` / `#416f78` / `#39694b`): shell/command code text and the `$` prompt cursor.
- **pine** (`#83a598` / `#518aa0` / `#286983` / `#076678`): the `~/.config/tmux` path label, links, and the active-pane border.
- **love** (`#fb4934` / `#eb6f92` / `#b4637a` / `#9d0006`): reserved for destructive/kill commands and the first terminal traffic-light dot.

### Text-safe accents (`gold-text` / `rose-text` / `iris-text`)

On the dark themes these equal the accent. On the **light themes** the pastel accents (Dawn gold `#ea9d34`, rose `#d7827e`) can't be both a legible text color and a pastel fill, so a darker text-only shade is used wherever the accent is **text on a background** (the hero "I", the Essentials heading, the search `:` prompt, inline code, plugin keys): Dawn `gold-text #8e5f20` / `rose-text #935956` / `iris-text #736187`; Gruvbox Light `gold-text #84560f` / `rose-text #ab3903` / `iris-text #8f3f71`. The pastel `gold`/`rose`/`iris` remain for dots, fills, borders, and dark-theme text.

### Neutral

- **surface** / **overlay** (`#32302f` / `#3c3836`): the two tonal step-ups for cards, nav bar, and inputs. Cards sit on `surface` at ~70% opacity; nav and search sit on `base` at 80–85% with `backdrop-blur`.
- **subtle** (`#a89984` / `#908caa` / `#696580` / `#685e54`): secondary text and the floor for body copy — placeholders, the `default:` label, counts. Tuned to clear ≥4.5:1 on every theme; route any small _content_ text here, not to `muted`.
- **muted** (`#9b8e80` / `#838097` / `#716e7b` / `#786b5f`): tertiary, near-decorative text — separators, footer meta, demo terminal lines. Clears 4.5:1 on `base`; not for placeholders or content on card surfaces.
- **hl-low / hl-med / hl-high** (`#32302f` / `#3c3836` / `#504945`): highlight rows, pill backgrounds, scrollbar thumb, and the keycap's bottom-border edge.
- **ink** (`#1d2021` / `#191724` / `#26233a` / `#fbf1c7`): the contrast color for text printed _on_ an accent fill (the active nav tab, the `prefix` keycap, status pills). Dark on the dark themes and on Rose Pine Dawn (whose accents are pastel); light only on Gruvbox Light (whose accents are dark). It is **not** simply `base`.

### Named Rules

**The Colorscheme Rule.** No component may hard-code a hex. It references a
semantic role, and the four `html[data-theme]` blocks repaint every role at
once. Adding a theme = one palette block in `globals.css` + one entry in
`ThemeSwitcher.tsx`, nothing else. Theming is a feature, not a skin.

**The Accent-As-Category Rule.** An accent always _means_ a command category.
The dot, the pill, and the hover border of a card always agree. Never use an
accent decoratively where it doesn't encode a group.

**The Text-Safe-Accent Rule.** A pastel accent is a fill/dot/border color, not
automatically a text color. When an accent is rendered as **text on a
background**, use the matching `*-text` token (`gold-text`, `rose-text`,
`iris-text`); it stays identical on dark themes and darkens just enough on the
light ones to clear 4.5:1. Body and secondary text never go below `subtle`.

## 3. Typography

**Display Font:** Space Grotesk (with Inter, sans-serif fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, "SF Mono")

**Character:** A three-voice system that mirrors a terminal session. Space
Grotesk gives headings a slightly mechanical, geometric edge without shouting;
Inter keeps prose quiet and legible; JetBrains Mono does the real work —
keys, commands, paths, counts, status text — because in this subject the
monospace _is_ the content, not a costume. The contrast axis is
geometric-display vs. humanist-body vs. mono, so the three never blur together.

### Hierarchy

- **Display** (Space Grotesk 700, `clamp(2.25rem, 5vw, 3rem)`, line-height 1.05, letter-spacing -0.025em): the hero `h1` only. Paired with a blinking iris cursor glyph.
- **Headline** (Space Grotesk 600, 1.125rem): category section titles, set beside an accent dot, a count, and a hairline rule.
- **Body** (Inter 400, 1rem; lead paragraph 1.125rem, line-height 1.625): descriptive prose. Card descriptions drop to 0.875rem with snug line-height. Cap measure at 65–75ch (the hero lead uses `max-w-xl`).
- **Label / Mono** (JetBrains Mono 500, 0.75rem): keys, code, command names, counts, nav windows, the status clock, and the `~/.config/tmux` kicker (uppercase, letter-spacing 0.2em).

### Named Rules

**The Mono-Is-Content Rule.** Monospace is reserved for things that are
literally terminal artifacts — keys, commands, paths, counts, status text.
Never use it as decorative "developer flavor" on prose; the subject earns it,
and prose stays in Inter.

## 4. Elevation

Flat by default. Depth is communicated through **tonal layering**, not shadows:
`base` (canvas) → `surface` (cards, nav, inputs) → `overlay` (borders, the
keycap face) → `hl-*` (highlight rows). Translucency plus `backdrop-blur` on the
sticky nav and search bar reinforce the sense of stacked panes over a single
background. The body carries a faint top-anchored radial `--glow` (tinted to the
theme accent, transparent on the light themes) — atmosphere, not elevation.

### Shadow Vocabulary (the rare exceptions)

- **Hero lift** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2)` — Tailwind `shadow-xl shadow-black/20`): used on the `TerminalHero` mockup only, to set it slightly above the page like a focused window. The single deliberate shadow in the system.
- **Keycap edge** (`border-bottom-width: 3px` in `hl-high`): a _faux-physical_ depth cue — not a box-shadow but a thick bottom border that makes a key read as pressable. The signature tactile detail.

### Named Rules

**The Flat-Pane Rule.** Surfaces are flat at rest and separated by tone and a
1px border, the way tmux separates panes. A drop shadow on a card is a bug; if
something needs to feel raised, step its tone up or thicken its border — don't
float it.

## 5. Components

Tactile and terminal-native. Things look pressable and borrowed from the
terminal: keys are physical, cards are panes, the nav is a status line, search
is command mode. Every interactive surface has a visible `:focus-visible` ring
(2px iris).

### Buttons & Pills

- **Shape:** small radius — pills/tabs `6px` (`rounded-md`), tag pills `4px` (`rounded-sm`).
- **Jump-bar pills:** ghost by default — `surface/60` fill, `overlay` border, `subtle` mono text; on hover the border brightens to `hl-high` and text to `text`. The essentials pill is the one accented variant (gold border + `gold/[0.06]` fill).
- **Custom pill:** `hl-low` background, accent-colored text, 10px uppercase tracked label — marks a command as the author's own binding.
- **Hover / Focus:** color-only transitions (`transition-colors`, 200ms). No transform on buttons; movement is reserved for cards and the hero.

### Keycap (signature component)

- A single physical key: `overlay` face, `hl-high` 1px border with a **3px bottom border**, `6px` radius, mono 0.8rem, min-width 1.65rem.
- **`prefix` variant:** filled `gold` with `ink` text and semibold weight — the tmux prefix key is always visually loudest.
- Chords join caps with a muted `+`; arrow names render as glyphs (`←↑↓→`); separators (`or`, `/`, `then`) are muted connective text.

### Command Card (the pane)

- **Corner / Background:** `8px` radius, `surface/70` fill, `overlay` 1px border.
- **Hover:** border shifts to the category accent at 60–70% opacity (`transition-colors`, 200ms). On filter, cards animate with framer-motion `layout` + a 30ms-staggered fade-up (capped at 8 items); exit scales to 0.96.
- **Anatomy:** description (+ optional `custom` pill) → key combos → `default:` note in muted text → shell/command lines as `foam` code on a `base/70` wash.
- **Padding:** 16px; internal gap 12px.

### Inputs / Search (command mode)

- **Style:** sticky under the nav, `surface` fill, `overlay` border, `8px` radius, mono text. Leads with an iris `:` prompt glyph — the field _is_ tmux command mode.
- **Focus:** `focus-within:border-iris`; the input itself drops its own outline in favor of the container border shift.
- **Affordances:** a `⌘K` keycap hint when empty, a live `N matches` count when typing. Bound to `/`, `Cmd/Ctrl-K` (focus) and `Esc` (clear).

### Navigation (the status line)

- **Style:** sticky, `z-30`, `base/85` + `backdrop-blur`, `overlay` bottom border, 56px tall.
- **Windows:** nav links render as tmux windows — `index` (muted) + `name` (mono). Active window is a filled `rose` tab with `ink` text and a dimmed index; inactive hover fills `overlay`.
- **status-left / status-right:** a session-pill brand switcher on the left; date + 24h clock + theme switcher + GitHub link on the right, echoing a real `status-right`.
- **Mobile:** windows scroll horizontally with the scrollbar hidden; date/clock hide below `md`/`lg`.

### TerminalHero (signature component)

A faux terminal window: traffic-light dots (`love`/`gold`/`pine`), a `tmux ~ main` title, tiled panes with `prefix` keycap tags, an active pane (`pine` border + blinking cursor), and a bottom status line echoing `tmux.conf`. Panes reveal with a 0.55s-staggered scale-in (framer-motion), fully disabled under reduced motion.

### Motion

CSS keyframes (`blink` for the cursor, `fade-up` for entrances) plus framer-motion for card layout and the hero stagger. Easing is `ease-out`; nothing bounces. **Every animation has a `prefers-reduced-motion` path** — blink and fade-up stop, framer variants collapse to opacity-only or no-op, and `transition` is globally neutralized.

## 6. Do's and Don'ts

### Do:

- **Do** reference semantic roles only (`bg-surface`, `text-pine`, `border-overlay`). Never hard-code a hex in a component — the four themes depend on it.
- **Do** keep an accent meaning a category: dot, custom pill, and card hover border must agree, sourced from `components/accent.ts`.
- **Do** convey depth with tonal steps (`base` → `surface` → `overlay` → `hl-*`) and 1px borders, per **The Flat-Pane Rule**.
- **Do** reserve monospace (JetBrains Mono) for terminal artifacts — keys, commands, paths, counts, status text — and keep prose in Inter.
- **Do** verify body text holds ≥4.5:1 on all four themes; the light Rose Pine Dawn and Gruvbox Light palettes are where `muted`/`subtle` text gets risky.
- **Do** give every animation a `prefers-reduced-motion: reduce` fallback (crossfade or instant), and every interactive element a 2px iris `:focus-visible` ring.

### Don't:

- **Don't** build a **dense docs wall** — no man-page text dumps. Every command is a scannable card with hierarchy and rhythm.
- **Don't** go **over-animated / flashy**: no bounce, elastic, or attention-grabbing motion. The blink and the quiet fade-up are the ceiling.
- **Don't** drift toward a **generic SaaS landing**: no gradient hero, no feature-card grid, no hero-metric blocks, no tiny uppercase tracked eyebrow above every section.
- **Don't** add a drop shadow to a card. The only shadow in the system is the hero lift; depth elsewhere is tone + border.
- **Don't** use `border-left`/`border-right` greater than 1px as a colored accent stripe. The keycap's 3px edge is a _bottom_ border by design; side-stripe accents are banned.
- **Don't** use an accent color decoratively where it doesn't encode a category, and don't introduce a fifth theme without adding both the `globals.css` palette block and the `ThemeSwitcher` entry.
