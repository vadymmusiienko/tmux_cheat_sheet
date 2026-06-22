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
import { HierarchyDiagram } from "@/components/HierarchyDiagram";

export const metadata: Metadata = {
  title: "Getting Started · tmux cheat sheet",
  description:
    "What tmux is, how to install it, and the basics of sessions and the prefix.",
};

export default function GettingStarted() {
  return (
    <article>
      <PageHeader
        eyebrow="window 1 · setup"
        title="Getting Started"
        lead="tmux is a terminal multiplexer: many terminal sessions, windows split into panes, all in one place, and they keep running after you disconnect."
      />

      <Section title="What is tmux?">
        <P>
          A <strong className="text-text">session</strong> is a workspace that
          lives on the server even when you detach or close the terminal. Each
          session holds <strong className="text-text">windows</strong> (like
          tabs), and each window splits into{" "}
          <strong className="text-text">panes</strong>. Detach, reboot your
          terminal app, reattach, and everything is exactly where you left it.
        </P>
        <Callout accent="foam">
          The whole point: long-running work (servers, builds, SSH sessions)
          survives disconnects, and one keystroke brings your entire layout
          back.
        </Callout>
        <HierarchyDiagram />
      </Section>

      <Section title="Install">
        <P>
          On macOS, install with Homebrew. On Linux, use your package manager.
        </P>
        <CodeBlock title="install">
          {`# macOS
brew install tmux

# Debian / Ubuntu
sudo apt install tmux

# Arch
sudo pacman -S tmux

# verify
tmux -V`}
        </CodeBlock>
        <P>
          My config lives at <C>~/.config/tmux/tmux.conf</C>. Plugins are
          managed by TPM; on a fresh machine clone it first, then press{" "}
          <KeyCombo value="prefix I" /> inside tmux to install.
        </P>
        <CodeBlock title="first-time plugin setup">
          {`git clone https://github.com/tmux-plugins/tpm \\
  ~/.config/tmux/plugins/tpm`}
        </CodeBlock>
      </Section>

      <Section title="Start &amp; attach">
        <P>
          I drive most of this through shell aliases (see the{" "}
          <a
            className="text-pine underline-offset-2 hover:underline"
            href="/aliases"
          >
            Aliases
          </a>{" "}
          tab), but the raw commands are:
        </P>
        <CodeBlock title="sessions">
          {`tmux                      # start a new session
tmux new -s work          # start a named session
tmux ls                   # list sessions
tmux attach -t work       # attach to "work"
tmux kill-session -t work # kill "work"`}
        </CodeBlock>
      </Section>

      <Section title="The prefix">
        <P>
          Almost every tmux shortcut starts with the{" "}
          <strong className="text-text">prefix</strong>. The default is{" "}
          <C>Ctrl-b</C>, but I&apos;ve remapped mine to{" "}
          <span className="font-mono text-foam">Ctrl-Space</span>, which is far
          easier to reach.
        </P>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-overlay bg-surface/60 px-5 py-4">
          <KeyCombo value="prefix" />
          <span className="text-muted">then a key, e.g.</span>
          <KeyCombo value="prefix c" />
          <span className="text-sm text-subtle">new window</span>
        </div>
        <Callout accent="gold">
          Throughout this site,{" "}
          <span className="font-mono text-gold">prefix</span> means{" "}
          <span className="font-mono">Ctrl-Space</span>. Head to the{" "}
          <a className="text-pine underline-offset-2 hover:underline" href="/">
            Cheat Sheet
          </a>{" "}
          for everything you can do after it.
        </Callout>
      </Section>
    </article>
  );
}
