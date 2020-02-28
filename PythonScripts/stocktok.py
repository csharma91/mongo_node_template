import requests
import pymongo
from bson.objectid import ObjectId
from pymongo import MongoClient
import azureTextAnalytics as textScore
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
                #Text Analytics API Call
                doc = result["summary"]
                #docSentiment,docPos, docNeut, docNeg, key_phrase = textScore.runTextAnalytics(doc)
                posts.append({
                    "user": ObjectId(userId),
                    "author": result["source"],
                    "title": result["headline"],
                    "body": result["summary"],
                    "avatar": result["image"],
                    "companyTags": comp,
                    "sentimentScore1:": int(docPos*100),
                    "sentimentScore2:": int(docNeut*100),
                    "sentimentScore3:": int(docNeg*100),
                    "sentimentType": docSentiment,
                    "key_phrase": key_phrase
                })
                print("Headline-----------")
                print(result["headline"])
                print("Summary-----------")
                print(result["summary"])

                
stockfeed.insert_many(posts)
