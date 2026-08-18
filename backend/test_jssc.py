import requests
from bs4 import BeautifulSoup
import json
import re

url = "https://www.sarkariresult.com/2026/jssc-jilcce-inter-level-july26/"
res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
soup = BeautifulSoup(res.text, 'html.parser')

job_data = {
    "shortDescription": "",
    "importantDates": {"_raw": []},
    "applicationFee": {"_raw": []},
    "ageLimit": {"_raw": []},
    "vacancyDetails": [],
    "howToApply": [],
    "organization": ""
}

# Short info is in Table 0 usually
tables = soup.find_all('table')
if tables:
    top_table = tables[0]
    for row in top_table.find_all('tr'):
        cells = row.find_all(['td', 'th'])
        if len(cells) == 2 and "Short Information" in cells[0].get_text():
            job_data["shortDescription"] = cells[1].get_text(strip=True)

# Main table is usually tables[1]
# We'll just scan all tables for nested or top level rows to get other sections
for table in tables:
    # If the table has th/td headers for vacancy
    headers = [th.get_text(strip=True).lower() for th in table.find_all(['th', 'td'])[:5]]
    is_vacancy_table = any("post" in h and ("name" in h or "total" in h) for h in headers)
    
    if is_vacancy_table:
        # Extract rows
        rows = table.find_all('tr')
        if len(rows) > 1:
            table_headers = [c.get_text(strip=True) for c in rows[0].find_all(['td', 'th'])]
            for r in rows[1:]:
                cells = [c.get_text(strip=True) for c in r.find_all(['td', 'th'])]
                if len(cells) == len(table_headers):
                    vac = dict(zip(table_headers, cells))
                    job_data["vacancyDetails"].append(vac)

    # For text-heavy rows (Age limit, Dates, Fee)
    for row in table.find_all('tr', recursive=False):
        cells = row.find_all(['td', 'th'], recursive=False)
        for c in cells:
            text = c.get_text(separator='\n', strip=True)
            # Basic heuristics
            if "Age Limit" in text:
                job_data["ageLimit"]["_raw"].append({"raw_text": text})
            elif "Important Dates" in text:
                job_data["importantDates"]["_raw"].append({"raw_text": text})
            elif "Application Fee" in text:
                job_data["applicationFee"]["_raw"].append({"raw_text": text})
            elif "How to Fill" in text:
                job_data["howToApply"].append({"raw_text": text})

print(json.dumps(job_data, indent=2))
