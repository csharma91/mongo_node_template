import requests
from bs4 import BeautifulSoup
import pandas as pd
# from requests_html import HTMLSession
import re
import json
#import bingSearch as search
import pickle

#https://github.com/MatthewChatham/glassdoor-review-scraper

headers = {'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
           'accept-encoding': 'gzip, deflate, sdch, br',
           'accept-language': 'en-GB,en-US;q=0.8,en;q=0.6',
           'referer': 'https://www.glassdoor.com/',
           'upgrade-insecure-requests': '1',
           'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
           'Cache-Control': 'no-cache',
           'Connection': 'keep-alive'
           }

listOfComps = ['Microsoft Corporation', 'Shopify Inc. Class A',
               'Tesla Inc', 'Amazon.com Inc.', 'Spotify Technology SA']


def runSearchAPI(listOfComps):
    apiResult = []

    for comp in listOfComps:
        print(comp)
        apiResult.append(
            search.bingSearchAPI(str(comp) + ' reviews')
        )

    with open('glassdoorURLs.pkl', 'wb') as f:
        pickle.dump(apiResult, f)


# Function Calls
# runSearchAPI(listOfComps)

with open('glassdoorURLs.pkl', 'rb') as f:
    apiResult = pickle.load(f)

qry = []
companyName = []
url = []
for result in apiResult:
    for index, row in result.iterrows():
        if ('-Reviews-E' in row['URL']) and ('_' not in row['URL']) and (row['Qry'] not in qry):
            print(index)
            print(row['URL'])
            qry_clean = re.sub('\ reviews', '', row['Qry'])
            qry.append(row['Qry'])
            companyName.append(qry_clean)
            url.append(row['URL'])

glassdoorPages = pd.DataFrame(list(zip(qry, url, companyName)), columns=[
                              'Qry', 'URL', 'CompanyName'])
print(glassdoorPages)

# Union List of Results into One Dataframe
#apiResult_concat = pd.concat(apiResult)
# apiResult_concat.to_csv('glassdoor_urls.csv')


pros = []
cons = []
maincomment = []
headline = []
advicetomanagement = []
dates = []

gdid = []
spid = []


#https://www.glassdoor.ca/Reviews/Microsoft-Reviews-E1651.htm?sort.sortType=RD&sort.ascending=false

url = 'https://www.glassdoor.com/Reviews/Microsoft-Reviews-E1651.htm' +'?sort.sortType=RD&sort.ascending=false'

page = requests.post(url, headers=headers)
soup = BeautifulSoup(page.text, "lxml")

a = soup.find('div', {"id": "ReviewsFeed"})

# Recommend/ Outlook/Approved of CEO
b = a.findAll('div', {'class': 'col-sm-4'})

c = a.findAll('time', {'class': 'date subtle small'})  # For Date and Time

d = a.findAll('li', {'class': 'empReview cf'})

for m in a:
    print('-'*200)
    print(m.text)

comment_list = a.findAll('p')

# for i in range(len(comment_list)):
#     print(comment_list[i].text)

for i in range(len(comment_list)):
    if comment_list[i].text == "Pros":
        pros.append(comment_list[i+1].text)
        # print(comment_list[i+1].text)


for i in range(len(comment_list)):
    if comment_list[i].text == "Cons":
        cons.append(comment_list[i+1].text)
        # print(comment_list[i+1].text)

for i in range(len(comment_list)):
    if comment_list[i].text == "Advice to Management":
        advicetomanagement.append(comment_list[i+1].text)
        # print(comment_list[i+1].text)


for i in range(len(comment_list)):
    if (comment_list[i].text != "Cons" or comment_list[i].text != "Pros"):
        maincomment.append(comment_list[i].text)
       # print(comment_list[i].text)


for cc in c:
    dates.append(cc.text)


for h in a.findAll('h2'):
    headline.append(h.text)

print(headline)
print(dates)
print(len(dates))
print(len(headline))
print(len(maincomment))
print(len(pros))
print(len(cons))
print(len(advicetomanagement))
print(maincomment)
