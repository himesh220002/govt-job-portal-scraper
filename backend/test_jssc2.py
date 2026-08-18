import requests
from bs4 import BeautifulSoup
import json

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

tables = soup.find_all('table')
if tables:
    top_table = tables[0]
    for row in top_table.find_all('tr'):
        cells = row.find_all(['td', 'th'])
        if len(cells) == 2 and "Short Information" in cells[0].get_text():
            job_data["shortDescription"] = cells[1].get_text(strip=True)

    for table in tables:
        rows = table.find_all('tr')
        if len(rows) < 2: continue
        
        # Extract table data
        for i, row in enumerate(rows):
            cells = row.find_all(['td', 'th'])
            header_texts = [c.get_text(strip=True).lower() for c in cells]
            
            # Identify vacancy tables
            if "total post" in header_texts and len(header_texts) > 1:
                headers = [c.get_text(strip=True) for c in cells]
                for data_row in rows[i+1:]:
                    data_cells = data_row.find_all(['td', 'th'])
                    data_texts = [c.get_text(strip=True) for c in data_cells]
                    # We might hit a row that isn't data, but mostly they match
                    if len(data_texts) == len(headers) and "Total Post" not in data_texts:
                        job_data["vacancyDetails"].append(dict(zip(headers, data_texts)))
                break # We found headers in this table, move to next table
                
    # Free-form parsing for specific text blocks
    for table in tables:
        for row in table.find_all('tr'):
            for cell in row.find_all(['td', 'th']):
                text = cell.get_text(separator='\n', strip=True)
                lower_text = text.lower()
                
                if "age limit" in lower_text:
                    if "minimum age" in lower_text or "maximum age" in lower_text:
                        job_data["ageLimit"]["_raw"].append({"raw_text": text})
                elif "important dates" in lower_text:
                    if "application begin" in lower_text:
                        job_data["importantDates"]["_raw"].append({"raw_text": text})
                elif "application fee" in lower_text:
                    if "obc" in lower_text or "general" in lower_text or "sc" in lower_text:
                        job_data["applicationFee"]["_raw"].append({"raw_text": text})
                elif "how to fill" in lower_text:
                    if "read the notification" in lower_text:
                        job_data["howToApply"].append({"raw_text": text})

print(json.dumps(job_data, indent=2))
