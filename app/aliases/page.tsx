import type { Metadata } from "next";
import { Callout, PageHeader } from "@/components/content";
import { aliases } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shell Aliases · tmux cheat sheet",
  description: "My tm* shell aliases for driving tmux from the command line.",
};

export default function Aliases() {
  return (
    <article>
      <PageHeader
        eyebrow="window 4 · aliases"
        title="Shell Aliases"
        lead="The tm* shortcuts I use to start, attach, and manage tmux without typing the full commands."
      />

      <div className="overflow-hidden rounded-xl border border-overlay">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface text-left">
              <th className="px-5 py-3 font-mono text-xs uppercase tracking-wide text-muted">
                Alias
              </th>
              <th className="px-5 py-3 font-mono text-xs uppercase tracking-wide text-muted">
                Command
              </th>
            </tr>
          </thead>
          <tbody>
            {aliases.map((a, i) => (
              <tr
                key={a.name}
                className={i % 2 ? "bg-surface/30" : "bg-transparent"}
              >
                <td className="whitespace-nowrap px-5 py-3 align-top">
                  <code className="rounded bg-overlay px-2 py-0.5 font-mono text-sm font-semibold text-gold">
                    {a.name}
                  </code>
                </td>
                <td className="px-5 py-3 align-top">
                  <code className="font-mono text-sm text-foam">
                    {a.command}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout accent="foam">
        <span className="mt-6 block">
          These live in{" "}
          <code className="font-mono text-foam">~/.config/zsh/zsh_aliases</code>{" "}
          in my dotfiles. The list on this page is stored in{" "}
          <code className="font-mono">data/aliases.json</code>.
        </span>
      </Callout>
    </article>
  );
}
