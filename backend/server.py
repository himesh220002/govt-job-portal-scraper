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

@app.route('/testonlinescrape', methods=['GET'])
def test_online_scrape():
    # Only scrape 3 items for a quick test
    try:
        run_pipeline(limit=3)
        return jsonify({"status": "Successfully scraped 3 items. Check Render logs and your MongoDB database!"}), 200
    except Exception as e:
        logging.error(f"Test scrape failed: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Govt Jobs Scraper Web Service is alive!"}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
