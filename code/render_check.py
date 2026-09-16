"""Headless render check for a local HTML file - never opens a window on the Mac.
Serves the file's folder on a local port, loads it in headless Chromium, screenshots
the viewport at an optional #anchor, prints console errors, and exits.
Usage: python3 code/render_check.py assets/audit-report-fixed.html [#campaigns] [out.png]
"""
import http.server, os, socketserver, sys, threading
from playwright.sync_api import sync_playwright

path = sys.argv[1]; anchor = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2].startswith('#') else ''
out = (sys.argv[3] if len(sys.argv) > 3 else (sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith('#') else 'screenshots/render-check.png'))
folder, name = os.path.split(os.path.abspath(path))
handler = lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=folder, **k)
srv = socketserver.TCPServer(('127.0.0.1', 0), handler); port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
errors = []
with sync_playwright() as p:
    b = p.chromium.launch(headless=True); pg = b.new_page(viewport={'width': 1440, 'height': 900})
    pg.on('console', lambda m: errors.append(m.text) if m.type == 'error' and 'favicon' not in m.text else None)
    pg.on('pageerror', lambda e: errors.append('PAGE ERROR: ' + str(e)))
    pg.goto(f'http://127.0.0.1:{port}/{name}{anchor}'); pg.wait_for_timeout(600)
    os.makedirs(os.path.dirname(out) or '.', exist_ok=True); pg.screenshot(path=out); b.close()
srv.shutdown()
print(f'screenshot {out} · console errors: {len(errors)}'); [print('  ', e[:200]) for e in errors]
