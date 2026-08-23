import requests
from bs4 import BeautifulSoup
import json

url = "https://www.sarkariresult.com/2024/rrb-ntpc-ug-1024/"
headers = {'User-Agent': 'Mozilla/5.0'}
html = requests.get(url, headers=headers).text
soup = BeautifulSoup(html, "html.parser")

important_links = []
tables = soup.find_all('table')
for table in tables:
    for row in table.find_all('tr'):
        cells = row.find_all(['td', 'th'])
        if len(cells) >= 2:
            label = cells[0].get_text(strip=True)
            links = []
            for cell in cells[1:]:
                links.extend(cell.find_all('a', href=True))
        elif len(cells) == 1:
            label = ""
            links = cells[0].find_all('a', href=True)
        else:
            continue
            
        row_links = []
        for link in links:
            row_links.append({"text": link.get_text(strip=True), "url": link['href']})
            
        if row_links:
            important_links.append({"label": label, "links": row_links})

print(json.dumps(important_links, indent=2))
