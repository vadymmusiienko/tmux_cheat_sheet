# Product

## Register

brand

## Users

Developers and terminal power users — and primarily the author themselves — who
live in tmux and want a fast, good-looking reference for the bindings they
actually use. The defining context: someone already comfortable in a terminal,
reaching for this mid-workflow to recall a specific keystroke, or browsing it
the way you'd admire a well-kept set of dotfiles. They value custom
`Ctrl-Space` bindings shown alongside the stock tmux defaults, and they expect
to search by key, command, or category and find the answer in seconds.

## Product Purpose

A personal tmux cheat sheet built as a small Next.js site. It documents every
command and shortcut the author uses, foregrounds their custom bindings, and
notes the tmux defaults beside them. It exists to be both a genuinely useful
quick-reference and a piece of craft — a personal project where the terminal-
native presentation is part of the point. Success is: the right command found
fast, on any of the four themes, and a visitor coming away thinking "this person
cares about their tools."

## Brand Personality

Crafted and hacker-cozy. Terminal-native, opinionated, lovingly detailed —
the feel of a power user's dotfiles turned into a website. Voice is direct,
lowercase-comfortable, and a little wry (`tmux, the way I use it_`,
`~/.config/tmux`). Three words: **crafted, native, personal.** The interface
should evoke the quiet satisfaction of a well-configured terminal: confident,
unfussy, and clearly made by someone who uses the thing it documents.

## Anti-references

- **Dense docs wall.** No read-the-docs / man-page text dump. Hierarchy,
  rhythm, and scannable cards over walls of prose.
- **Over-animated / flashy.** No bouncy, attention-grabbing motion. Motion stays
  in service of reading (cursor blink, subtle fade-up), never in the way.
- **Generic SaaS landing.** No gradient hero, feature-card grid, big-metric
  blocks, or marketing eyebrows. This is a tool with personality, not a product
  pitch.

## Design Principles

- **Native to its subject.** The UI borrows tmux's own grammar — status-line
  nav, panes-as-cards, physical keycaps — so the medium reflects the material.
- **Custom-first, defaults-beside.** The author's bindings lead; stock tmux
  defaults are always shown next to them, never hidden. The site teaches a
  point of view, not just a lookup table.
- **Fast to the answer.** Search (`/` or `Cmd/Ctrl-K`), category jumps, and an
  essentials shortlist mean the target keystroke is never more than a few
  seconds away.
- **Themed, not decorated.** Four real palettes (Rose Pine, Rose Pine Dawn,
  Gruvbox Dark/Light) driven by semantic tokens — switching is a first-class
  feature, not a gimmick.
- **Made by a user, for users.** Every detail should read as deliberate and
  lived-in, the digital equivalent of someone's carefully maintained dotfiles.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Body text must clear 4.5:1 against its surface on all four
themes (the light Dawn/Gruvbox palettes are the ones to watch). Keyboard access
is first-class: visible `:focus-visible` rings, `/` and `Cmd/Ctrl-K` search
shortcuts, skip-to-content where relevant. Reduced motion is respected — cursor
blink and fade-up are disabled under `prefers-reduced-motion`. Don't rely on the
accent color (the per-category dot) alone to convey meaning; pair it with text.
