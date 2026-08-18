from playwright.sync_api import sync_playwright
import re
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('https://www.sarkariresult.com')
    page.wait_for_timeout(3000)
    for a in page.query_selector_all('div#page a')[:20]:
        print(a.get_attribute('href'))
    browser.close()
