import requests
from bs4 import BeautifulSoup
import json

url = "https://www.sarkariresult.com/2024/rrb-ntpc-ug-1024/"
html = requests.get(url).text
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
            link_text = link.get_text(strip=True)
            href = link['href']
            
            low_text = link_text.lower()
            low_label = label.lower()
            low_href = href.lower()
            
            if (
                "android app" in low_label or "android app" in low_text or
                "apple ios app" in low_label or "apple ios app" in low_text or
                "telegram" in low_label or "telegram" in low_text or
                "whatsapp" in low_label or "whatsapp" in low_text or
                "signature resizer" in low_label or 
                "sarkariresultportal" in low_href or
                "sarkariresult.com" in low_href or
                "sarkariresult.info" in low_href or
                "sarkari result" in low_label and "channel" in low_label
            ):
                continue
                
            row_links.append({"text": link_text, "url": href})
            
        if row_links:
            important_links.append({
                "label": label,
                "links": row_links
            })

print(json.dumps(important_links, indent=2))
