import requests
from bs4 import BeautifulSoup
import pandas as pd
from requests_html import HTMLSession
import re
import json



headers = {'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'accept-encoding': 'gzip, deflate, sdch, br',
			'accept-language': 'en-GB,en-US;q=0.8,en;q=0.6',
			'referer': 'https://www.glassdoor.com/',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
}



pros = []
cons = []
maincomment = []
headline = []
advicetomanagement = []
dates = []

gdid = []
spid = []



listOfComps = ['Microsoft Corporation','Shopify Inc. Class A','Tesla Inc','Amazon.com Inc.','Spotify Technology SA']
listOfLinks = []
compList = []

for comp in listOfComps:
    comp = comp.split()[0]
    url = '''http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=62624&t.k=de2QRGh2fKM&employer='''+str(comp)+'''&action=employers&pn=2&ps=1000&useragent=Mozilla/%2F4.0/'''
    page = requests.get(url, headers = headers)
    output = json.loads(page.text)
    print (output['response']['attributionURL']) 
    url = output['response']['attributionURL']
    page =requests.post(url, headers = headers)
    soup = BeautifulSoup(page.text,"lxml")

    counter = 0
    for link in soup.findAll('a', attrs={'href': re.compile("^/Overview/")}):
        if counter == 0:
            linkStr = link.get('href')
            linkStr.replace('/Overview/','/Reviews/')
            listOfLinks.append(link.get('href'))
            compList.append(comp)
            counter =1

        
print(compList)
print(listOfLinks)


    


# url = 'https://www.glassdoor.ca/Reviews/Amazon-Reviews-E6036.htm'

# page =requests.post(url, headers = headers)
# soup = BeautifulSoup(page.text,"lxml")

# a = soup.find('div',{"id":"ReviewsRef"})

# b = a.findAll('div', {'class':'col-sm-4'}) # Recommend/ Outlook/Approved of CEO

# c = a.findAll('time', {'class':'date subtle small'}) #For Date and Time

# d = a.findAll('li', {'class':'empReview cf'})



# comment_list = a.findAll('p')


# i=0
# for i in range(len(comment_list)):
#     if comment_list[i].text == "Pros":
#         pros.append(comment_list[i+1].text)
#         #print(comment_list[i+1].text)


# for i in range(len(comment_list)):
#     if comment_list[i].text == "Cons":
#         cons.append(comment_list[i+1].text)
#         #print(comment_list[i+1].text)
   
# for i in range(len(comment_list)):
#     if comment_list[i].text == "Advice to Management":
#         advicetomanagement.append(comment_list[i+1].text)
#         #print(comment_list[i+1].text)
   
    
# for i in range(len(comment_list)):
#     if (comment_list[i].text != "Cons" or comment_list[i].text != "Pros"):
#         maincomment.append(comment_list[i].text)
#        # print(comment_list[i].text)
   

# for cc in c:
#     dates.append(cc.text)
    
    
   


# for h in  a.findAll('h2'):
#     headline.append(h.text)
    
    
    
# print (headline)
# print (pros)
# print (cons)