from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('https://www.sarkariresult.com')
    page.wait_for_timeout(3000)
    print(page.title())
    print("Number of a tags:", len(page.query_selector_all('a')))
    print("Number of #post a tags:", len(page.query_selector_all('#post a')))
    print("Content preview:", page.content()[:500])
    browser.close()
