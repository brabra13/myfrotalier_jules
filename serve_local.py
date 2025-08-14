#!/usr/bin/env python3
"""
Simple HTTP server to serve the TOU simulator files locally.
This resolves CORS issues when loading the JSON tax bracket data.

Usage:
    python serve_local.py [port]

Default port: 8000
Access the simulator at: http://localhost:8000/mock_up_MyFrontalier.html
"""

import http.server
import socketserver
import sys
import os
import webbrowser
from pathlib import Path

def main():
    # Get port from command line argument or use default
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}")
            sys.exit(1)
    
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    # Create HTTP server
    handler = http.server.SimpleHTTPRequestHandler
    
    # Add CORS headers to allow cross-origin requests
    class CORSRequestHandler(handler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', '*')
            super().end_headers()
    
    try:
        with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
            print(f"🚀 Starting HTTP server on port {port}")
            print(f"📁 Serving files from: {script_dir}")
            print(f"🌐 Access the TOU simulator at: http://localhost:{port}/mock_up_MyFrontalier.html")
            print(f"📊 JSON data will be loaded from: http://localhost:{port}/baremes-2024-impot-source_complet.json")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print()
            
            # Optionally open browser
            try:
                webbrowser.open(f"http://localhost:{port}/mock_up_MyFrontalier.html")
                print("🌐 Browser opened automatically")
            except:
                print("ℹ️  Could not open browser automatically")
            
            print()
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {port} is already in use")
            print(f"💡 Try a different port: python serve_local.py {port + 1}")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)

if __name__ == "__main__":
    main()
