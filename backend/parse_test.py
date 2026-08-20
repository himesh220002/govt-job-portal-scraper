import requests
from bs4 import BeautifulSoup

headers = {'User-Agent': 'Mozilla/5.0'}
url = "https://www.sarkariresult.com/latestjob/"
html = requests.get(url, headers=headers).text
soup = BeautifulSoup(html, "html.parser")
links = soup.select("div#post a")
if links:
    link = links[0].get("href")
    job_html = requests.get(link, headers=headers).text
    job_soup = BeautifulSoup(job_html, "html.parser")

    for div in job_soup.find_all('div'):
        if div.text and ("Post Update" in div.text or "Post Date" in div.text):
            print(f"FOUND IN DIV: {div.text.strip()[:200]}")
            break

    for td in job_soup.find_all('td'):
        if td.text and ("Post Update" in td.text or "Post Date" in td.text):
            print(f"FOUND IN TD: {td.text.strip()[:200]}")
            break
else:
    print("No links found on latestjob page.")
