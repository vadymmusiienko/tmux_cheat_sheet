"use client";

import { createContext, useContext } from "react";
import type { ToolConfig } from "@/lib/tools/types";

const ToolCtx = createContext<ToolConfig | null>(null);

export function ToolProvider({
  tool,
  children,
}: {
  tool: ToolConfig;
  children: React.ReactNode;
}) {
  return <ToolCtx.Provider value={tool}>{children}</ToolCtx.Provider>;
}

/** Read the active tool. Must be used under a ToolProvider. */
export function useTool(): ToolConfig {
  const tool = useContext(ToolCtx);
  if (!tool) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return tool;
}
