export function Footer() {
  return (
    <footer className="mt-20 border-t border-overlay">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          <span className="text-pine">~/.config/tmux/tmux.conf</span> · Rose
          Pine · tmux 3.6
        </p>
        <a
          href="https://github.com/vadymmusiienko/tmux_cheat_sheet/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-subtle transition-colors hover:text-text"
        >
          github.com/vadymmusiienko/tmux_cheat_sheet
        </a>
      </div>
    </footer>
  );
}
