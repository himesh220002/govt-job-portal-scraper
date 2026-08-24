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

@app.route('/testonlinescrape', methods=['GET'])
def test_online_scrape():
    # Capture all logs into a string buffer
    log_stream = io.StringIO()
    stream_handler = logging.StreamHandler(log_stream)
    stream_handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    stream_handler.setFormatter(formatter)
    
    # Attach to root logger
    root_logger = logging.getLogger()
    root_logger.addHandler(stream_handler)
    
    try:
        run_pipeline(limit=3)
        status_msg = "Successfully scraped 3 items! Check MongoDB."
    except Exception as e:
        logging.error(f"Test scrape failed with exception: {e}")
        status_msg = f"Failed: {e}"
    finally:
        root_logger.removeHandler(stream_handler)
        
    log_contents = log_stream.getvalue()
    
    # Return as HTML so it renders nicely in the browser
    html = f"""
    <html>
    <head><title>Scraper Test Logs</title></head>
    <body style="font-family: monospace; background: #121212; color: #fff; padding: 20px;">
        <h2>Test Scrape Status: {status_msg}</h2>
        <hr>
        <h3>Live Execution Logs:</h3>
        <pre style="background: #1e1e1e; color: #00ff00; padding: 15px; border-radius: 8px; overflow-x: auto;">{log_contents}</pre>
    </body>
    </html>
    """
    return html, 200

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Govt Jobs Scraper Web Service is alive!"}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
