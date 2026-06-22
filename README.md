# tmux cheat sheet

A personal tmux cheat sheet, built as a small Next.js site. It documents every command
and shortcut I use, with my custom `Ctrl-Space` bindings up front and the stock tmux
defaults noted right beside them. Themed with Rose Pine, plus a few switchable themes.

## Features

- **Searchable cheat sheet.** Every command as a card, grouped by category, with a sticky
  command-mode search (press `/` or `Cmd/Ctrl-K`). Custom bindings are tagged and show the
  default they replace.
- **Guide pages.** Getting Started, Configuration & Theming, Plugins & Tools, and Shell Aliases.
- **tmux-native design.** The top nav is styled like a tmux status line, and command cards
  read like tmux panes.
- **Theme switcher.** Rose Pine (default), Rose Pine Dawn, Gruvbox Dark, and Gruvbox Light.
  Your choice is saved in `localStorage`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- [Tailwind CSS v4](https://tailwindcss.com)
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
app/             Next.js routes (cheat sheet + guide pages)
components/       UI: nav, search, cards, theme switcher
lib/             data loading, types, helpers
data/
  tmux.json      the commands and shortcuts (source of the cheat sheet)
  aliases.json   the tm* shell aliases shown on the Aliases page
```

To add or change a command, edit `data/tmux.json`; to update the aliases, edit
`data/aliases.json`. The site reads these files directly.

## Themes

Themes are plain CSS variable sets in `app/globals.css`, switched by the `data-theme`
attribute on `<html>`. Adding a new theme is a matter of adding one palette block and an
entry in `components/ThemeSwitcher.tsx`.

## Deploy

It is a standard static-friendly Next.js app and deploys to Vercel (or any Node host) with
no extra configuration.
