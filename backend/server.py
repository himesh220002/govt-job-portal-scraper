from flask import Flask, request, jsonify
import os
import threading
import logging
from scraper import run_pipeline

app = Flask(__name__)

# Basic authentication token
# You must set SCRAPER_API_KEY in your Render environment variables!
SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY", "default-secret-key")

@app.route('/api/run-scraper', methods=['POST'])
def trigger_scraper():
    auth_header = request.headers.get('Authorization')
    
    # Check if the correct API key was provided
    if auth_header != f"Bearer {SCRAPER_API_KEY}":
        logging.warning("Unauthorized scraper trigger attempt.")
        return jsonify({"error": "Unauthorized"}), 401
    
    # Run the scraper in a background thread.
    # This ensures we respond instantly to GitHub Actions and don't timeout the HTTP connection.
    thread = threading.Thread(target=run_pipeline)
    thread.start()
    
    return jsonify({"status": "Scraper triggered successfully. Running in background."}), 202

import io

from flask import Response
import queue

@app.route('/testonlinescrape', methods=['GET'])
def test_online_scrape():
    def generate_logs():
        yield "<html><head><title>Live Scraper Logs</title></head>"
        yield "<body style='background: #121212; color: #00ff00; font-family: monospace; padding: 20px;'>"
        yield "<h2>Scraping 3 items... Live Logs:</h2><hr><pre>\n"
        
        log_queue = queue.Queue()
        
        class QueueHandler(logging.Handler):
            def emit(self, record):
                try:
                    msg = self.format(record) + "\n"
                    log_queue.put(msg)
                except Exception:
                    pass
                    
        handler = QueueHandler()
        handler.setLevel(logging.INFO)
        handler.setFormatter(logging.Formatter('%(asctime)s - %(message)s'))
        
        root_logger = logging.getLogger()
        root_logger.addHandler(handler)
        
        def background_scrape():
            try:
                run_pipeline(limit=3)
                log_queue.put("\n[SUCCESS] Scraping completed successfully! Check your MongoDB.\nDONE\n")
            except Exception as e:
                log_queue.put(f"\n[ERROR] Scraping failed: {e}\nDONE\n")
                
        thread = threading.Thread(target=background_scrape)
        thread.start()
        
        while True:
            try:
                # Wait up to 20 seconds for the next log (prevents gunicorn timeout)
                msg = log_queue.get(timeout=20)
                if msg == "DONE\n":
                    break
                # Yield the log and flush it to the browser immediately
                yield msg
            except queue.Empty:
                yield "<i>...waiting for next log...</i>\n"
                # Check if thread died silently
                if not thread.is_alive():
                    yield "\n[WARNING] Process terminated unexpectedly.\n"
                    break
                    
        root_logger.removeHandler(handler)
        yield "</pre></body></html>"
        
    return Response(generate_logs(), mimetype='text/html')

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Govt Jobs Scraper Web Service is alive!"}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
