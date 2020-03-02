import requests
import pymongo
from pymongo import MongoClient
import pythonConfig as pc
import json


cluster = MongoClient(pc.mongoDB['client'])
db = cluster["test"]


def TestFunc():
    cluster = MongoClient(pc.mongoDB['client'])
    db = cluster["test"]
    collection = db["stockfeeds"]

    stockfeeds = collection.find({})

    key_list = []
    for stockfeed in stockfeeds:
        for key in stockfeed.keys():
            # print(key)
            key_list.append(key)

    print(key_list[24])

    ss = str(key_list[24])

    stockfeeds = collection.find({})
    for stockfeed in stockfeeds:
        stockfeed.update({"$rename": {ss: "sentimentScoreOne"}})
        print(stockfeed[ss])


def InsertNewDatabase(db):
    with open('../DataSetSamples/CanadaSymbols_IEXCloud.json') as f:
        data = json.load(f)

    collection = db["Symbols_Canada"]
    collection.insert_many(data)


# InsertNewDatabase(db)
