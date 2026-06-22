# tmux — Personal Cheat Sheet


> Generated from `data/tmux.json` by `build.py`. Don't edit this file directly — edit the JSON (or your config) and run `python3 build.py`. See [How to update](#how-to-update).


## My setup at a glance

- **Prefix:** `Ctrl-Space` (replaces the default `Ctrl-b`)
- **Splits:** `\` side-by-side, `-` stacked
- **Pane nav:** `Ctrl-h/j/k/l` (seamless with Neovim via vim-tmux-navigator)
- **Plugins:** tpm · tmux-sensible · vim-tmux-navigator · tmux-resurrect · tmux-continuum
- **Theme:** Rose Pine · truecolor (`tmux-256color` + `RGB`)
- **Config:** `~/.config/tmux/tmux.conf`


## ⚡ Essentials

The bindings I use every day (custom where they differ from stock tmux).

| Action | Keys | Default |
| --- | --- | --- |
| Prefix key (press before most shortcuts) | `Ctrl-Space` | `Ctrl-b` |
| Reload config file | `prefix r` | — |
| Detach from session | `prefix d` | — |
| Create window (keeps current path) | `prefix c` | — |
| Previous window | `Ctrl-Shift-Left` | `prefix p` |
| Next window | `Ctrl-Shift-Right` | `prefix n` |
| Split pane right (side by side) | `prefix \` | `prefix %` |
| Split pane down (stacked) | `prefix -` | `prefix "` |
| Switch to pane in the given direction (vim-aware, also works in Neovim) | `Ctrl-h / Ctrl-j / Ctrl-k / Ctrl-l` | `prefix Left/Down/Up/Right` |
| Resize current pane (hold to keep resizing) | `Shift-Left / Shift-Down / Shift-Up / Shift-Right` | `prefix Ctrl-Left/Down/Up/Right` |
| Toggle pane zoom (fullscreen the current pane) | `prefix z` | — |
| Close current pane | `prefix x` | — |
| Enter copy mode | `prefix [` | — |
| Begin selection (vim-style) | `v` | `Space` |
| Copy selection to system clipboard (pbcopy / wl-copy / xclip) | `y or Enter` | `Enter` |
| Paste contents of the most recent buffer | `prefix ]` | — |
| Install plugins (TPM) | `prefix I` | — |
| Save session / environment (tmux-resurrect) | `prefix S` | `prefix Ctrl-s` |
| Restore last saved session / environment (tmux-resurrect) | `prefix R` | `prefix Ctrl-r` |

## Shell aliases

Pulled live from `~/.config/zsh/zsh_aliases` when this sheet is built.

| Alias | Command |
| --- | --- |
| `tm` | `tmux` |
| `tma` | `tmux attach` |
| `tmn` | `tmux new-session` |
| `tml` | `tmux list-sessions` |
| `tmk` | `tmux kill-session` |
| `tmat` | `tmux attach-session -t` |
| `tmnt` | `tmux new-session -t` |
| `tmkt` | `tmux kill-session -t` |
| `tm-work` | `tmux new-session -d -s work` |
| `tm-dev` | `tmux new-session -d -s dev` |
| `tm-main` | `tmux attach-session -t main \|\| tmux new-session -s main` |
| `tmka` | `tmux kill-server` |

## Plugins (TPM)

Managed by [TPM](https://github.com/tmux-plugins/tpm). `prefix I` install · `prefix U` update · `prefix Alt-u` clean.

| Action | Keys / Command |
| --- | --- |
| Install plugins (TPM) | `prefix I` |
| Update plugins (TPM) | `prefix U` |
| Remove plugins not in the config (TPM) | `prefix Alt-u` |
| Save session / environment (tmux-resurrect) | `prefix S` <sub>(default: `prefix Ctrl-s`)</sub> |
| Restore last saved session / environment (tmux-resurrect) | `prefix R` <sub>(default: `prefix Ctrl-r`)</sub> |
| Auto-save every 15 min and auto-restore on start (tmux-continuum, automatic) | `set -g @continuum-restore 'on'` |

## Full reference

### Sessions

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| Start a new session |  | `new`<br>`tmux`<br>`tmux new`<br>`tmux new-session` |
| Start a new session or attach to an existing session named mysession |  | `tmux new-session -A -s mysession` |
| Start a new session with the name mysession |  | `new -s mysession`<br>`tmux new -s mysession` |
| Kill / delete the current session |  | `kill-session` |
| Kill / delete session mysession |  | `tmux kill-ses -t mysession`<br>`tmux kill-session -t mysession` |
| Kill / delete all sessions but the current |  | `tmux kill-session -a` |
| Kill / delete all sessions but mysession |  | `tmux kill-session -a -t mysession` |
| Rename session | `prefix $` |  |
| Detach from session | `prefix d` |  |
| Detach others on the session (maximize by detaching other clients) |  | `attach -d` |
| Show all sessions | `prefix s` | `tmux ls`<br>`tmux list-sessions` |
| Attach to last session |  | `tmux a`<br>`tmux at`<br>`tmux attach`<br>`tmux attach-session` |
| Attach to a session with the name mysession |  | `tmux a -t mysession`<br>`tmux at -t mysession`<br>`tmux attach -t mysession`<br>`tmux attach-session -t mysession` |
| Session and window preview | `prefix w` |  |
| Move to previous session | `prefix (` |  |
| Move to next session | `prefix )` |  |

### Windows

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| Create window (keeps current path) | `prefix c` |  |
| Previous window | `Ctrl-Shift-Left` <sub>(default: `prefix p`)</sub> |  |
| Next window | `Ctrl-Shift-Right` <sub>(default: `prefix n`)</sub> |  |
| Start a new session named mysession with window mywindow |  | `tmux new -s mysession -n mywindow` |
| Rename current window | `prefix ,` |  |
| Close current window | `prefix &` |  |
| List windows | `prefix w` |  |
| Switch / select window by number | `prefix 0 ... 9` |  |
| Toggle last active window | `prefix l` |  |
| Open window actions menu | `prefix <` |  |
| Reorder window, swap window number 2 (src) and 1 (dst) |  | `swap-window -s 2 -t 1` |
| Move current window to the left by one position |  | `swap-window -t -1` |
| Move window from source to target |  | `move-window -s src_ses:win -t target_ses:win`<br>`movew -s foo:0 -t bar:9`<br>`movew -s 0:0 -t 1:9` |
| Reposition window in the current session |  | `move-window -s src_session:src_window`<br>`movew -s 0:9` |
| Renumber windows to remove gaps in the sequence |  | `move-window -r`<br>`movew -r` |

### Panes

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| Split pane right (side by side) | `prefix \` <sub>(default: `prefix %`)</sub> | `split-window -h` |
| Split pane down (stacked) | `prefix -` <sub>(default: `prefix "`)</sub> | `split-window -v` |
| Switch to pane in the given direction (vim-aware, also works in Neovim) | `Ctrl-h / Ctrl-j / Ctrl-k / Ctrl-l` <sub>(default: `prefix Left/Down/Up/Right`)</sub> |  |
| Resize current pane (hold to keep resizing) | `Shift-Left / Shift-Down / Shift-Up / Shift-Right` <sub>(default: `prefix Ctrl-Left/Down/Up/Right`)</sub> |  |
| Toggle pane zoom (fullscreen the current pane) | `prefix z` |  |
| Close current pane | `prefix x` |  |
| Toggle last active pane | `prefix ;` |  |
| Join two windows as panes (merge window 2 into window 1 as panes) |  | `join-pane -s 2 -t 1` |
| Move pane from one window to another (pane 1 of window 2 to after pane 0 of window 1) |  | `join-pane -s 2.1 -t 1.0` |
| Move the current pane left | `prefix {` |  |
| Move the current pane right | `prefix }` |  |
| Toggle synchronize-panes (send input to all panes at once) |  | `setw synchronize-panes` |
| Toggle between pane layouts | `prefix Space` |  |
| Switch to next pane | `prefix o` |  |
| Show pane numbers | `prefix q` |  |
| Switch / select pane by number | `prefix q 0 ... 9` |  |
| Convert pane into a window | `prefix !` |  |
| Open pane actions menu | `prefix >` |  |

### Copy Mode

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| Enter copy mode | `prefix [` |  |
| Begin selection (vim-style) | `v` <sub>(default: `Space`)</sub> |  |
| Copy selection to system clipboard (pbcopy / wl-copy / xclip) | `y or Enter` <sub>(default: `Enter`)</sub> |  |
| Paste contents of the most recent buffer | `prefix ]` |  |
| Use vi keys in copy mode / buffer |  | `setw -g mode-keys vi` |
| Enter copy mode and scroll one page up | `prefix PgUp` |  |
| Quit copy mode | `q` |  |
| Go to top line | `g` |  |
| Go to bottom line | `G` |  |
| Move cursor (left / down / up / right) | `h / j / k / l` |  |
| Move cursor forward one word | `w` |  |
| Move cursor backward one word | `b` |  |
| Search forward | `/` |  |
| Search backward | `?` |  |
| Next keyword occurrence | `n` |  |
| Previous keyword occurrence | `N` |  |
| Clear selection | `Esc` |  |
| Display the most recent buffer contents |  | `show-buffer` |
| Copy entire visible contents of pane to a buffer |  | `capture-pane` |
| Show all buffers |  | `list-buffers` |
| Show all buffers and paste the selected one |  | `choose-buffer` |
| Save buffer contents to buf.txt |  | `save-buffer buf.txt` |
| Delete buffer 1 |  | `delete-buffer -b 1` |

### Misc

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| Prefix key (press before most shortcuts) | `Ctrl-Space` <sub>(default: `Ctrl-b`)</sub> |  |
| Reload config file | `prefix r` | `source-file ~/.config/tmux/tmux.conf` |
| Enter command mode | `prefix :` |  |
| Set OPTION for all sessions |  | `set -g OPTION` |
| Set OPTION for all windows |  | `setw -g OPTION` |
| Enable mouse mode |  | `set mouse on` |
| Print tmux version |  | `tmux -V` |

### Help

| Action | Shortcut | Shell / tmux command |
| --- | --- | --- |
| List all key bindings (shortcuts) | `prefix ?` | `list-keys`<br>`tmux list-keys` |
| Show every session, window, pane, etc. |  | `tmux info` |


## How to update

- **Add or change a command:** edit `data/tmux.json`, then run `python3 build.py`.
- **Mark something as an everyday binding:** set `"tier": "essential"` (and `"mine": true`) on its entry.
- **Note a custom override:** add a `"default"` field with the stock binding.
- **After changing your tmux config:** run `python3 scripts/check-drift.py` to see which config bindings/aliases aren't in the sheet yet.
