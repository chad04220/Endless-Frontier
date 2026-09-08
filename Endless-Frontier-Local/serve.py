#!/usr/bin/env python3
"""Serve the bundled game locally; requires only Python 3.7+ standard library."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser


class GameHandler(SimpleHTTPRequestHandler):
    extensions_map = dict(SimpleHTTPRequestHandler.extensions_map)
    extensions_map.update({".js": "text/javascript", ".mjs": "text/javascript",
                           ".css": "text/css", ".wasm": "application/wasm"})

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="Play Endless Frontier locally")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error("port must be between 1 and 65535")
    game = Path(__file__).resolve().parent / "dist"
    if not (game / "index.html").is_file():
        parser.error("dist/index.html is missing. Extract the complete ZIP first.")
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port),
                                     partial(GameHandler, directory=str(game)))
    except OSError as exc:
        parser.exit(1, "Could not start the local server: %s\n"
                    "Close the other server or use --port 8081.\n" % exc)
    server.daemon_threads = True
    url = "http://127.0.0.1:%d/" % args.port
    print("Endless Frontier is ready: " + url, flush=True)
    print("Keep this window open while playing. Press Ctrl+C to stop.", flush=True)
    timer = None
    if not args.no_browser:
        timer = threading.Timer(0.4, lambda: webbrowser.open(url))
        timer.daemon = True
        timer.start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nLocal server stopped. Your browser save is retained.")
    finally:
        if timer:
            timer.cancel()
        server.server_close()


if __name__ == "__main__":
    main()
