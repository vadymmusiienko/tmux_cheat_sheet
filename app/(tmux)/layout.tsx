import type { Metadata } from "next";
import { ToolProvider } from "@/components/ToolContext";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { tmuxTool } from "@/lib/tools/tmux";

export const metadata: Metadata = {
  title: "tmux cheat sheet",
  description:
    "A personal tmux cheat sheet: every command and shortcut, with my custom bindings and the tmux defaults.",
};

export default function TmuxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToolProvider tool={tmuxTool}>
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <Footer />
      <CommandPalette />
    </ToolProvider>
  );
}
