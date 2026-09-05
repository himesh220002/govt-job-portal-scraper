from flask import Flask, request, jsonify
import os
import threading
import logging
from scraper import run_pipeline

app = Flask(__name__)

# Basic authentication token
# You must set SCRAPER_API_KEY in your Render environment variables!
SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY", "default-secret-key")

import urllib.request

def run_pipeline_with_keepalive(limit=None):
    """Runs scraping pipeline with an active keep-alive worker. Pings every 2 minutes until FULL scraping finishes. Includes try...finally cleanup and a 60-minute hard safety ceiling."""
    stop_event = threading.Event()
    
    def keep_alive_worker():
        port = int(os.environ.get("PORT", 8080))
        url = f"http://127.0.0.1:{port}/"
        ping_count = 0
        max_safety_pings = 30  # Safety ceiling: 30 pings max = 60 minutes max limit
        
        while not stop_event.is_set() and ping_count < max_safety_pings:
            # Wait 2 minutes (120 seconds) between pings
            stopped = stop_event.wait(120)
            if not stopped and ping_count < max_safety_pings:
                try:
                    with urllib.request.urlopen(url, timeout=5) as response:
                        response.read()
                    ping_count += 1
                    logging.info(f"[KEEP-ALIVE] Ping #{ping_count}/{max_safety_pings} sent. Keeping Render active during full coverage scraping.")
                except Exception as e:
                    logging.debug(f"[KEEP-ALIVE] Internal ping failed: {e}")
        
        logging.info(f"[KEEP-ALIVE] Worker terminated (Total pings sent: {ping_count}). Render will sleep 15 mins after inactivity.")

    pinger = threading.Thread(target=keep_alive_worker, daemon=True)
    pinger.start()
    
    try:
        run_pipeline(limit=limit)
    finally:
        # Guaranteed to execute even if run_pipeline throws an exception or crashes
        stop_event.set()

@app.route('/api/run-scraper', methods=['POST'])
def trigger_scraper():
    auth_header = request.headers.get('Authorization')
    
    # Check if the correct API key was provided
    if auth_header != f"Bearer {SCRAPER_API_KEY}":
        logging.warning("Unauthorized scraper trigger attempt.")
        return jsonify({"error": "Unauthorized"}), 401
    
    # Default to None (Full Coverage across all categories) on cloud trigger
    limit = None
    data = request.get_json(silent=True)
    if isinstance(data, dict) and 'limit' in data:
        limit = data.get('limit')

    # Run the scraper in a background thread with keep-alive
    thread = threading.Thread(target=lambda: run_pipeline_with_keepalive(limit=limit))
    thread.start()
    
    return jsonify({"status": "Full coverage scraper triggered successfully. Running in background with continuous keep-alive until finished."}), 202

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

@app.route('/scrapeall', methods=['GET'])
def scrape_all():
    # Require API key in the URL query string for browser access
    # Example: https://renderurl.com/scrapeall?key=mypass
    provided_key = request.args.get('key')
    if provided_key != SCRAPER_API_KEY:
        return jsonify({"error": "Unauthorized. Please provide ?key=YOUR_API_KEY"}), 401

    def generate_logs():
        yield "<html><head><title>Full Scraper Logs</title></head>"
        yield "<body style='background: #121212; color: #00ff00; font-family: monospace; padding: 20px;'>"
        yield "<h2>Full Scraping Pipeline Started... Live Logs:</h2><hr><pre>\n"
        
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
                # FULL PIPELINE with Keep-Alive to prevent Render free-tier sleep
                run_pipeline_with_keepalive()
                log_queue.put("\n[SUCCESS] Full Scraping completed successfully! Check your MongoDB.\nDONE\n")
            except Exception as e:
                log_queue.put(f"\n[ERROR] Scraping failed: {e}\nDONE\n")
                
        thread = threading.Thread(target=background_scrape)
        thread.start()
        
        while True:
            try:
                msg = log_queue.get(timeout=20)
                if msg == "DONE\n":
                    break
                yield msg
            except queue.Empty:
                yield "<i>...waiting for next log (scraping in progress)...</i>\n"
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
