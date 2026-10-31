"""
OmniCore Frontend Launcher
Runs a lightweight local web server to serve the frontend on http://localhost:8000
and automatically opens the default web browser.

Note: Root Python files (atm.py, contactbook.py, sample calculate.py) remain 100% untouched.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n=======================================================")
        print(f"  OmniCore Studio • Python Suite Frontend")
        print(f"  Serving at: {url}")
        print(f"  Directory : {DIRECTORY}")
        print(f"  Press Ctrl+C to stop the server")
        print(f"=======================================================\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            sys.exit(0)

if __name__ == "__main__":
    run()

