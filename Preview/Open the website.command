#!/bin/bash
# Absolute Zero, FTC Team 12096.
# Double-click this to view the site the way a real web server serves it.
# Close the Terminal window when you are finished; that stops the server.

cd "$(dirname "$0")" || exit 1

printf '\n  Absolute Zero, FTC Team 12096\n'
printf '  Starting a local server for this folder.\n\n'

# Find a Python. macOS ships one, but only once the developer tools are
# present, so fall back to simply opening the page if there is none.
PY=""
for candidate in python3 /usr/bin/python3 /usr/local/bin/python3 /opt/homebrew/bin/python3; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c "import http.server" >/dev/null 2>&1; then
    PY="$candidate"
    break
  fi
done

if [ -z "$PY" ]; then
  printf '  No Python was found on this Mac, so the local server cannot start.\n'
  printf '  Opening the site directly instead. Everything still works.\n\n'
  open index.html
  printf '  You can close this window.\n\n'
  exit 0
fi

printf '  Leave this window open while you browse.\n'
printf '  Close it, or press Control-C, to stop.\n\n'

exec "$PY" - <<'PY'
import functools, http.server, os, socket, socketserver, threading, webbrowser

ROOT = os.getcwd()

# Ask the operating system for a free port rather than guessing one.
with socket.socket() as probe:
    probe.bind(("127.0.0.1", 0))
    port = probe.getsockname()[1]


class Quiet(http.server.SimpleHTTPRequestHandler):
    """The stock handler, rooted at this folder and with the access log off."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, *args):
        pass


socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("127.0.0.1", port), Quiet) as httpd:
    url = "http://localhost:%d/" % port
    print("  Open in your browser:  %s\n" % url)
    threading.Timer(1.0, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.\n")
PY
