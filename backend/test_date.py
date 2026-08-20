import requests
from bs4 import BeautifulSoup

url = "https://www.sarkariresult.com/latestjob/"
html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")
links = soup.select('div#post a')
if links:
    job_url = links[0].get('href')
    print("Job URL:", job_url)
    job_html = requests.get(job_url).text
    job_soup = BeautifulSoup(job_html, "html.parser")
    for b in job_soup.find_all('b'):
        if "Update" in b.text or "Date" in b.text:
            print("Found B:", b.parent.text[:100].replace('\n', ' '))
    for div in job_soup.find_all('div'):
        if div.text and ("Post Update" in div.text or "Post Date" in div.text):
            print("Found DIV:", div.text[:100].replace('\n', ' '))
