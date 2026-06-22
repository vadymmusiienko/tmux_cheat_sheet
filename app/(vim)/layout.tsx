import type { Metadata } from "next";
import { ToolProvider } from "@/components/ToolContext";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { vimTool } from "@/lib/tools/vim";

export const metadata: Metadata = {
  title: "vim cheat sheet",
  description:
    "A personal nvim cheat sheet: my custom keymaps, the essential vim motions, and the NvChad leader bindings I rely on.",
};

export default function VimLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToolProvider tool={vimTool}>
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
      <Footer />
      <CommandPalette />
    </ToolProvider>
  );
}
