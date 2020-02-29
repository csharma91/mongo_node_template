import requests
import pymongo
import pythonConfig as pycon

from pymongo import MongoClient

cluster = MongoClient(
    'mongodb+srv://chintan123:chintan123@contactkeeper-xtowj.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE')
db = cluster["test"]
token = pycon.IEXCloud['token']
tickers = ['SPOT', 'MSFT', 'AMZN', 'SHOP', 'FB', 'TSLA']


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


ModifyStockFeed(tickers, token)


# print(LogoInserts(tickers, token))
