from playwright.sync_api import sync_playwright
import re
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('https://www.sarkariresult.com')
    page.wait_for_timeout(3000)
    html = page.content()
    # Find all divs with an id attribute
    div_ids = re.findall(r'<div[^>]+id="([^"]+)"', html)
    print("Div IDs found:", set(div_ids))
    browser.close()
