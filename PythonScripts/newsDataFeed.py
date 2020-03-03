import requests
import pymongo
import pythonConfig as pycon

from pymongo import MongoClient

cluster = MongoClient(pycon.mongoDB['client'])
db = cluster["test"]
token = pycon.IEXCloud['token']
tickers = ['SPOT', 'MSFT', 'AMZN', 'SHOP', 'FB', 'TSLA']


def GetNewsFromRandomSec(token):
    collection = db["SnP500Companies"]
    newsFeed2 = db["NewsFeed_v2"]
    counter = 0
    tickers = []
    for y in collection.find():
        tickers.append(y['symbol'])
    newTickers = tickers[tickers.index('J') + 1:]
    for tick in newTickers:
        if newTickers.index(tick) % 15 == 0:
            try:
                url = 'https://cloud.iexapis.com/v1/stock/{tick}/news/last/30?token={token}'.format(
                    tick=tick, token=token)
                response = requests.get(url)
                news_articles = response.json()
                newsFeed2.insert_many(news_articles)
                print(news_articles)
            except Exception:
                pass


def NewsAPIInsert(ticker, token):
    collection = db["newsarticles"]
    for tick in tickers:
        url = 'https://cloud.iexapis.com/v1/stock/{tick}/news/last/50?token={token}'.format(
            tick=tick, token=token)
        response = requests.get(url)
        news_articles = response.json()
        collection.insert_many(news_articles)
        return news_articles


def LogoInserts(tickers, token):
    collection = db["companyLogo"]
    logoList = []
    for tick in tickers:
        url = 'https://cloud.iexapis.com/v1/stock/{tick}/logo?token={token}'.format(
            tick=tick, token=token)
        response = requests.get(url)
        res = response.json()
        logoList.append({
            "url": res["url"],
            "companyName": tick
        })
    collection.insert_many(logoList)
    return logoList


def ModifyStockFeed(tickers, token):
    stockfeedsCollection = db["stockfeeds"]
    logoCollection = db["companyLogo"]

    # avatar = https://i.ya-webdesign.com/images/news-transparent-border-2.png
    # Glassdoor = https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg
    for tick in tickers:
        compLogo = logoCollection.find_one({'companyName': tick})
        print(compLogo['url'])
        qry = {"companyTags": [tick]}
        stockfeedsCollection.update(
            {"companyTags": [tick]},
            {"$set": {'avatar': compLogo['url']}},
            multi=True
        )

        # print(stockfeedsCollection.update(query=qry, update={
        #     "$set": {'avatar': compLogo['url']}},{multi:True }))


# Function Calls
#ModifyStockFeed(tickers, token)
#print(LogoInserts(tickers, token))

# GetNewsFromRandomSec(token)
