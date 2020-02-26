import requests
import pymongo

from pymongo import MongoClient

cluster = MongoClient(
    'mongodb+srv://chintan123:chintan123@contactkeeper-xtowj.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE')
db = cluster["test"]
collection = db["newsarticles"]
token = 'pk_f2683fe83e824951b34108b8de9c6acf'

tickers = ['SPOT', 'MSFT', 'AMZN', 'SHOP', 'FB', 'TSLA']


for tick in tickers:
    url = 'https://cloud.iexapis.com/v1/stock/{tick}/news/last/50?token={token}'.format(
        tick=tick, token=token)
    response = requests.get(url)
    news_articles = response.json()
    collection.insert_many(news_articles)
