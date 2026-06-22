import { REPO_URL, VIM_URL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-overlay">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          <span className="text-pine">~/.config/tmux/tmux.conf</span> · tmux 3.6
        </p>
        <nav className="flex items-center gap-4 font-mono">
          <a
            href="/"
            className="text-subtle transition-colors hover:text-text"
            aria-current="page"
          >
            tmux
          </a>
          <a
            href={VIM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle transition-colors hover:text-text"
          >
            vim
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtle transition-colors hover:text-text"
          >
            github
          </a>
        </nav>
      </div>
    </footer>
  );
}
