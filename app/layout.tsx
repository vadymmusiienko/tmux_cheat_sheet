import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "cheatsheets",
  description:
    "Personal cheat sheets for the terminal tools I live in — tmux and vim.",
};

// Per-tool theme: derive the tool from the path, then apply its saved theme (or
// default) before paint so there's no flash. The landing page keeps the SSR
// default. Keys: `tmux-theme` / `vim-theme`.
const themeInit = `(function(){try{var p=location.pathname;var tool=p.indexOf('/vim')===0?'vim':(p.indexOf('/tmux')===0?'tmux':null);if(tool){var def=tool==='vim'?'vim-onedark':'gruvbox-dark';var t=localStorage.getItem(tool+'-theme')||def;document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="gruvbox-dark"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${space.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
