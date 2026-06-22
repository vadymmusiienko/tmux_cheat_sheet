import type { Metadata } from "next";
import {
  Callout,
  Feature,
  FeatureGrid,
  P,
  PageHeader,
  Section,
} from "@/components/content";
import { KeyCombo } from "@/components/KeyCombo";

export const metadata: Metadata = {
  title: "Plugins & Tools · tmux cheat sheet",
  description:
    "The TPM plugins in my setup: sensible, vim-tmux-navigator, resurrect, continuum.",
};

export default function Plugins() {
  return (
    <article>
      <PageHeader
        eyebrow="window 3 · plugins"
        title="Plugins & Tools"
        lead="Everything is managed by TPM. These five plugins do the heavy lifting: sane defaults, seamless Neovim navigation, and sessions that survive reboots."
      />

      <Section title="Managing plugins (TPM)">
        <P>
          The Tmux Plugin Manager loads plugins listed in the config. The three
          bindings you need:
        </P>
        <div className="flex flex-wrap gap-6 rounded-lg border border-overlay bg-surface/60 px-5 py-4">
          <span className="flex items-center gap-3 text-sm text-subtle">
            <KeyCombo value="prefix I" /> install
          </span>
          <span className="flex items-center gap-3 text-sm text-subtle">
            <KeyCombo value="prefix U" /> update
          </span>
          <span className="flex items-center gap-3 text-sm text-subtle">
            <KeyCombo value="prefix Alt-u" /> clean
          </span>
        </div>
      </Section>

      <Section title="The plugins">
        <FeatureGrid>
          <Feature name="tmux-sensible" role="defaults">
            A baseline of settings most people end up wanting anyway: faster{" "}
            <span className="font-mono">escape-time</span>,{" "}
            <span className="font-mono">focus-events</span>, bigger history, and
            saner key behavior. I rely on it so my config stays short.
          </Feature>
          <Feature name="vim-tmux-navigator" role="navigation">
            Makes <span className="font-mono text-foam">Ctrl-h/j/k/l</span> move
            between tmux panes and Neovim splits with the same keys, so you stop
            thinking about the boundary entirely.
          </Feature>
          <Feature name="tmux-resurrect" role="persistence">
            Saves and restores your full session layout (windows, panes, and
            pane contents) on demand with <KeyCombo value="prefix S" /> and{" "}
            <KeyCombo value="prefix R" />.
          </Feature>
          <Feature name="tmux-continuum" role="persistence">
            Builds on resurrect: auto-saves every 15 minutes and{" "}
            <span className="text-text">auto-restores on start</span>, so your
            environment comes back after a reboot with no keystrokes at all.
          </Feature>
          <Feature name="tpm" role="manager">
            The plugin manager itself. It clones, loads, and updates everything
            above from the list at the bottom of{" "}
            <span className="font-mono">tmux.conf</span>.
          </Feature>
        </FeatureGrid>
      </Section>

      <Section title="Persistence, end to end">
        <P>
          Together, resurrect and continuum mean a reboot is a non-event: the
          last auto-save is restored automatically, including what was scrolled
          back in each pane.
        </P>
        <Callout accent="rose">
          Save bindings are remapped to plain{" "}
          <span className="font-mono text-rose">S</span> /{" "}
          <span className="font-mono text-rose">R</span> (the defaults are{" "}
          <span className="font-mono">Ctrl-s</span> /{" "}
          <span className="font-mono">Ctrl-r</span>).
        </Callout>
      </Section>
    </article>
  );
}
