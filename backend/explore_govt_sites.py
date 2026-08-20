import requests
from bs4 import BeautifulSoup

urls_to_check = [
    "https://upsc.gov.in/examinations/active-exams",
    "https://ssc.gov.in/",
    "https://sbi.co.in/web/careers/current-openings"
]

headers = {'User-Agent': 'Mozilla/5.0'}

for url in urls_to_check:
    print(f"\n--- Exploring {url} ---")
    try:
        html = requests.get(url, headers=headers, timeout=10, verify=False).text
        soup = BeautifulSoup(html, "html.parser")
        
        tables = soup.find_all('table')
        print(f"Found {len(tables)} tables.")
        for i, t in enumerate(tables[:2]):
            headers_list = [th.get_text(strip=True) for th in t.find_all('th')]
            print(f"  Table {i+1} headers: {headers_list}")
            
        print("Checking for keywords in page text...")
        text = soup.get_text().lower()
        for kw in ["vacancy", "age limit", "fee", "date"]:
            count = text.count(kw)
            print(f"  '{kw}': {count} occurrences")
            
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
