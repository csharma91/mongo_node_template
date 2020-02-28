import requests
import pymongo

from pymongo import MongoClient

cluster = MongoClient('mongodb+srv://chintan123:chintan123@contactkeeper-xtowj.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE')
db = cluster["test"]
collection = db["stockfeeds"]

stockfeeds = collection.find({})

key_list = []
for stockfeed in stockfeeds:
    for key in stockfeed.keys():
        # print(key)
        key_list.append(key)

print (key_list[24])

ss = str(key_list[24])

stockfeeds = collection.find({})
for stockfeed in stockfeeds:
    stockfeed.update({"$rename":{ss:"sentimentScoreOne"}})
    print(stockfeed[ss])
