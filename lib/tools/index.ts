import { tmuxTool } from "./tmux";
import { vimTool } from "./vim";
import type { ToolConfig, ToolId, ToolSummary } from "./types";

export type { ToolConfig, ToolId, ToolSummary } from "./types";

export const TOOLS_BY_ID: Record<ToolId, ToolConfig> = {
  tmux: tmuxTool,
  vim: vimTool,
};

const TAGLINE: Record<ToolId, string> = {
  tmux: "Sessions, windows, panes, copy-mode — my custom bindings with the defaults beside them.",
  vim: "Custom maps, motions, text objects, and the NvChad leader bindings I live in.",
};

function stat(t: ToolConfig): string {
  const custom = t.commands.filter((c) => c.mine).length;
  return `${t.commands.length} commands · ${custom} custom`;
}

/** Order tools appear in the brand switcher and on the landing hub. */
export const TOOL_ORDER: ToolId[] = ["tmux", "vim"];

export const TOOLS: ToolSummary[] = TOOL_ORDER.map((id) => {
  const t = TOOLS_BY_ID[id];
  return {
    id: t.id,
    name: t.name,
    basePath: t.basePath,
    brandAccent: t.brandAccent,
    tagline: TAGLINE[id],
    stat: stat(t),
  };
});
