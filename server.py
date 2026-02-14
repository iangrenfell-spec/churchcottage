#!/usr/bin/env python3
"""Simple HTTP server for Church Cottage site on localhost:5000"""
import http.server
import os

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Serve 404.html for unknown paths
        path = self.translate_path(self.path)
        if not os.path.exists(path) and not self.path.startswith('/favicon'):
            self.path = '/404.html'
        return super().do_GET()


if __name__ == '__main__':
    with http.server.HTTPServer(('0.0.0.0', PORT), Handler) as httpd:
        print(f'Church Cottage site serving at http://localhost:{PORT}')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nServer stopped.')
