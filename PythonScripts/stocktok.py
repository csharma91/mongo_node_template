import requests
import pymongo
from bson.objectid import ObjectId
from pymongo import MongoClient
# #For Keywords
# from gensim.summarization import keywords
# #For Sentiment Score and Polartiy
# from textblob import TextBlob


# Initialize Cluster
cluster = MongoClient(
    'mongodb+srv://chintan123:chintan123@contactkeeper-xtowj.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE')

# Initialize Database
db = cluster["test"]

# Initialize Collections
news = db["newsarticles"]
profile = db["userprofiles"]
stockfeed = db["stockfeeds"]

userId = '5e556a19f78c3f2cbc6ae964'  # Morty

# Get User Profile
userProfile = profile.find({"user": ObjectId(userId)})

# Field Map between StockFeed and NewsSource
# author = source
# body = summary
# avatar = image
# title = headline

posts = []
for p in userProfile:
    print(p['stocks'])
    tickers = p['stocks']
    print(tickers)

    for tick in tickers:
        results = news.find({"related": tick})
        for result in results:
            # Only look for posts in English
            if result['lang'] == "en":
                comp = [tick]
                posts.append({
                    "user": ObjectId(userId),
                    "author": result["source"],
                    "title": result["headline"],
                    "body": result["summary"],
                    "avatar": result["image"],
                    "companyTags": comp
                })
                print("Headline-----------")
                print(result["headline"])
                print("Summary-----------")
                print(result["summary"])
                # blob = TextBlob(result["headline"])
                # score = 0
                # count = 0
                # for sentence in blob.sentences:
                #     score = score + (sentence.sentiment.polarity)
                #     count += 1

                # avgScore = score/count

                # print ("Headline-----------")
                # print( result["headline"])
                # print ("Summary-----------")
                # print( result["summary"])

                # print(avgScore)


# stockfeed.insert_many(posts)
