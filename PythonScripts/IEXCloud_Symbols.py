import random
from random import randrange
import pandas as pd
import pymongo
from pymongo import MongoClient
import pythonConfig as pcon
import json
import requests


# MongoDB
cluster = MongoClient(pcon.mongoDB['client'])
db = cluster["test"]
# IEX
token = pcon.IEXCloud['token']


def SnP500Companies(token):
    collection = db["SnP500Companies"]

    df = pd.read_csv('../DataSetSamples/SnP500.csv')
    with open('../DataSetSamples/USSymbols_IEXCloud.json') as f:
        data = json.load(f)

    counter = 0
    listOfComps = []
    for index, row in df.iterrows():
        for d in data:
            if (d['symbol'] == row['Symbol']):
                tick = d['symbol']
                url = 'https://cloud.iexapis.com/v1/stock/{tick}/logo?token={token}'.format(
                    tick=tick, token=token)
                response = requests.get(url)
                logos = response.json()
                logo = logos['url']
                print('-' * 100)
                print(counter)
                counter += 1
                d['logoURL'] = logo
                print(d)
                listOfComps.append(d)

    collection.insert_many(listOfComps)


# Function Call
# SnP500Companies(token)
