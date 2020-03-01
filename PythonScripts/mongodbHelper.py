import requests
import pymongo
from pymongo import MongoClient
import pythonConfig as pc


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


if __name__ == '__main__':
    TestFunc()
