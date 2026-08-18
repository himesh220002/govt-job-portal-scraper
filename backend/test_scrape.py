import requests
from bs4 import BeautifulSoup

res = requests.get("https://www.sarkariresult.com/")
soup = BeautifulSoup(res.text, 'html.parser')
links = soup.select('div#page a')
job_links = []
for a in links:
    href = a.get('href')
    if href:
        job_links.append(href)
print(job_links[:20])
