import type { Metadata } from "next";
import {
  C,
  Callout,
  CodeBlock,
  P,
  PageHeader,
  Section,
} from "@/components/content";
import { KeyCombo } from "@/components/KeyCombo";

export const metadata: Metadata = {
  title: "Configuration & Theming · tmux cheat sheet",
  description:
    "A walkthrough of my tmux.conf: prefix, splits, copy mode, Rose Pine, truecolor.",
};

export default function Configuration() {
  return (
    <article>
      <PageHeader
        eyebrow="window 2 · config"
        title="Configuration & Theming"
        lead="A tour of the choices in my tmux.conf — what I changed from the defaults and why."
      />

      <Section title="Prefix &amp; reload">
        <P>
          The first change is the prefix: <C>Ctrl-b</C> →{" "}
          <span className="font-mono text-foam">Ctrl-Space</span>. A reload
          binding on <KeyCombo value="prefix r" /> re-sources the config without
          restarting.
        </P>
        <CodeBlock title="tmux.conf · prefix">
          {`unbind C-b
set -g prefix C-Space
bind C-Space send-prefix

bind r source-file ~/.config/tmux/tmux.conf \\
  \\; display-message "Config reloaded!"`}
        </CodeBlock>
      </Section>

      <Section title="Splits that make sense">
        <P>
          The default split keys (<C>%</C> and <C>&quot;</C>) are unmemorable. I
          use <KeyCombo value="prefix \" /> for a vertical divider (panes side
          by side) and <KeyCombo value="prefix -" /> for a horizontal one (panes
          stacked). New panes and windows open in the current directory.
        </P>
        <CodeBlock title="tmux.conf · splits">
          {`bind \\\\ split-window -h
bind -  split-window -v
bind c  new-window -c "#{pane_current_path}"
unbind '"'
unbind %`}
        </CodeBlock>
      </Section>

      <Section title="Vim-aware navigation">
        <P>
          With vim-tmux-navigator, <KeyCombo value="Ctrl-h" /> /{" "}
          <KeyCombo value="Ctrl-j" /> / <KeyCombo value="Ctrl-k" /> /{" "}
          <KeyCombo value="Ctrl-l" /> move between panes <em>and</em> Neovim
          splits seamlessly. Resizing is on <KeyCombo value="Shift-Left" /> and
          friends; window switching on <KeyCombo value="Ctrl-Shift-Left" /> /{" "}
          <KeyCombo value="Ctrl-Shift-Right" />.
        </P>
      </Section>

      <Section title="Copy mode &amp; clipboard">
        <P>
          Copy mode uses vi keys: <KeyCombo value="prefix [" /> to enter,{" "}
          <C>v</C> to select, <C>y</C> to yank. The yank pipes to the system
          clipboard, picking the right tool per OS.
        </P>
        <CodeBlock title="tmux.conf · copy mode">
          {`setw -g mode-keys vi
bind-key -T copy-mode-vi v send-keys -X begin-selection

# OS-aware clipboard: pbcopy / wl-copy / xclip
if-shell '[ "$(uname)" = "Darwin" ]' {
  bind-key -T copy-mode-vi y \\
    send-keys -X copy-pipe-and-cancel "pbcopy"
}`}
        </CodeBlock>
      </Section>

      <Section title="Truecolor">
        <P>
          For accurate Rose Pine colors I run <C>tmux-256color</C> and advertise{" "}
          <C>RGB</C> so 24-bit color passes through to Ghostty.
        </P>
        <CodeBlock title="tmux.conf · color">
          {`set -g default-terminal "tmux-256color"
set -as terminal-features ",*:RGB"`}
        </CodeBlock>
        <Callout accent="iris">
          <span className="font-mono text-iris">terminal-features</span> is a
          server option, so it applies to clients on their next attach — detach
          and reattach to see truecolor kick in.
        </Callout>
      </Section>

      <Section title="Rose Pine status bar">
        <P>
          The status line is hand-styled with Rose Pine colors: a gold session
          pill on the left, the window list in the middle, and the date, time,
          and host on the right. The palette below is exactly what this site
          uses.
        </P>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {[
            ["base", "bg-base border border-overlay"],
            ["surface", "bg-surface"],
            ["gold", "bg-gold"],
            ["rose", "bg-rose"],
            ["pine", "bg-pine"],
            ["foam", "bg-foam"],
            ["iris", "bg-iris"],
            ["love", "bg-love"],
            ["text", "bg-text"],
            ["subtle", "bg-subtle"],
            ["muted", "bg-muted"],
            ["overlay", "bg-overlay"],
          ].map(([name, cls]) => (
            <div key={name} className="flex flex-col gap-1.5">
              <div className={`h-10 rounded-md ${cls}`} />
              <span className="font-mono text-[11px] text-muted">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
