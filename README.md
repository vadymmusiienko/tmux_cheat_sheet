# cheatsheets

Personal cheat sheets for the terminal tools I live in, built as one small Next.js site.
A landing hub links to a cheat sheet per tool; each documents the commands and shortcuts I
use, with my custom bindings up front and the stock defaults noted beside them.

- **tmux** — sessions, windows, panes, copy-mode. My `Ctrl-Space` prefix and the defaults.
- **vim** (nvim / NvChad) — my custom maps, the essential motions and text objects, and the
  NvChad `<leader>` bindings, plus the `vim-tmux-navigator` integration that ties back to tmux.

Each tool has its own theme set and a "Vimy" / tmux-native chrome, switched instantly from a
brand-switcher dropdown in the nav. The structure is built to add more tools later (git, zsh, …).

## Features

- **Searchable cheat sheet.** Every binding as a card, grouped by category, with a sticky
  command-mode search (press `/` or `Cmd/Ctrl-K`). Custom bindings are tagged; vim cards show
  the relevant mode.
- **Per-tool theming.** tmux ships Gruvbox + Rose Pine; vim ships One Dark, Tokyo Night, and a
  light Paper theme. Each tool remembers its own choice in `localStorage`.
- **Native design.** The tmux nav reads like a status line; the vim hero is a faux nvim buffer
  with a `~` gutter and a live `-- NORMAL --` modeline.
- **Cross-linked.** The brand switcher and footer jump between tools as instant internal routes.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, route groups) and React 19
- [Tailwind CSS v4](https://tailwindcss.com) — semantic color tokens, themes via `data-theme`
- TypeScript
- Fonts: Space Grotesk, Inter, JetBrains Mono

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build and preview the production site:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx              landing hub (links to each tool)
  layout.tsx            root shell: fonts + path-aware theme init
  (tmux)/               tmux route group (its own TopNav/Footer/Palette)
    layout.tsx
    tmux/page.tsx       the tmux cheat sheet
    tmux/...            guide pages (setup, config, plugins, aliases)
  (vim)/
    layout.tsx
    vim/page.tsx        the vim cheat sheet
components/             shared UI: cards, palette, nav, heroes, ToolContext
lib/
  data.ts              buildToolData(): normalize + group a tool's commands
  types.ts             RawCommand / Command (keys, mode, excmd, tmuxcmd…)
  tools/               the tool registry
    types.ts           ToolConfig
    tmux.ts, vim.ts    per-tool config (themes, nav, hero, data)
    index.ts           TOOLS summaries for the switcher + landing
data/
  tmux.json            tmux commands · aliases.json the tm* aliases
  vim.json             vim keymaps (custom + motions + NvChad defaults)
```

### Adding a binding

Edit the tool's data file (`data/tmux.json` or `data/vim.json`). Each entry is a
`RawCommand`: `desc`, `cat`, optional `keys`, `mine` (your custom binding), `mode`,
`default` (the binding it replaces), and `excmd`/`tmuxcmd`/`shell` for command equivalents.

### Adding a tool

Add `data/<tool>.json`, a `lib/tools/<tool>.ts` config, an `app/(<tool>)/` route group, and
register it in `lib/tools/index.ts`. Themes are just `[data-theme]` blocks in `globals.css`.

## Themes

Themes are CSS variable sets in `app/globals.css`, switched by the `data-theme` attribute on
`<html>`. Components only reference semantic tokens (`base`, `surface`, `pine`, …), so a new
theme is one palette block plus an entry in the owning tool's `themes` list.

## Deploy

A standard static-friendly Next.js app; deploys to Vercel (or any Node host) with no extra
configuration.
