import requests
import pymongo
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import MongoClient
import azureTextAnalytics as textScore
import pythonConfig as pc

# #For Keywords
# from gensim.summarization import keywords
# #For Sentiment Score and Polartiy
# from textblob import TextBlob


# Initialize Cluster
cluster = MongoClient(cluster=MongoClient(pc.mongoDB['client']))

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


def InsertNewsToStockfeed(userProfile):

    posts = []
    for p in userProfile:
        print(p['stocks'])
        tickers = p['stocks']
        print(tickers)

        for tick in tickers:
            results = news.find({"related": tick})
            for result in results:
                # Only look for posts in English
                if (result['lang'] == "en" and ((len(result["summary"].split())) > 100)):
                    comp = [tick]
                    ts = int(result['datetime'])/1000
                    print(type(ts))
                    # Text Analytics API Call
                    #doc = result["summary"]
                    #docSentiment,docPos, docNeut, docNeg, key_phrase = textScore.runTextAnalytics(doc)

                    posts.append({

                        "user": ObjectId(userId),
                        "author": result["source"],
                        "title": result["headline"],
                        "body": result["summary"],
                        "postType": "News",
                        "avatar": "https://i.ya-webdesign.com/images/news-transparent-border-2.png",
                        "url": result["url"],
                        "articleImage": result["image"],
                        "companyTags": comp,
                        "sentimentScore1": int(docPos*100),
                        "sentimentScore2": int(docNeut*100),
                        "sentimentScore3": int(docNeg*100),
                        "sentimentType": docSentiment,
                        "keywords": key_phrase,
                        "date": datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

                    })
                    print("Headline-----------")
                    print(result["headline"])
                    print("Summary-----------")
                    print(len(result["summary"].split()))
                    print(result["summary"])
    return posts


def InsertGlassdoorToStockfeed(userProfile):
    # posts = []
    posts = [{
        "user": ObjectId(userId),
        "author": "Glassdoor",
        "title": "If they don't push you, you can enjoy with this job",
        "body": "Pros: You can have good benefit and their management is friendly Cons:If you work hard, pain in your feet, but if you don't push this job, you can enjoy.",
        "postType": "Glassdoor",
        "avatar": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "url": "https://www.glassdoor.ca/Reviews/Amazon-Reviews-E6036.htm",
        "articleImage": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "companyTags": ['AMZN'],
        "sentimentScore1": 100,
        "sentimentScore2": 0,
        "sentimentScore3": 0,
        "sentimentType":"positive",
        "keywords":['AMZN'],
        "date": "February 22, 2020"

    },
        {
        "user": ObjectId(userId),
        "author": "Glassdoor",
        "title": "Fun job and rewarding benifits",
        "body": "Pros: Fun job and rewarding benifits Cons:long hours at times at short notice",
        "postType": "Glassdoor",
        "avatar": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "url": "https://www.glassdoor.ca/Reviews/Microsoft-Reviews-E1651.htm?countryRedirect=true",
        "articleImage": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "companyTags": ['MSFT'],
        "sentimentScore1": 100,
        "sentimentScore2": 0,
        "sentimentScore3": 0,
        "sentimentType":"positive",
        "keywords":['MSFT'],
        "date": "February 22, 2020"

    },
        {
        "user": ObjectId(userId),
        "author": "Glassdoor",
        "title": "Great company, smart people.",
        "body": "Pros: Cutting edge of enterprise software business. Cons:Siloed teams in some areas.",
        "postType": "Glassdoor",
        "avatar": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "url": "https://www.glassdoor.ca/Reviews/Microsoft-Reviews-E1651.htm?countryRedirect=true",
        "articleImage": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "companyTags": ['MSFT'],
        "sentimentScore1": 100,
        "sentimentScore2": 0,
        "sentimentScore3": 0,
        "sentimentType":"positive",
        "keywords":['MSFT'],
        "date": "February 22, 2020"

    },
        {
        "user": ObjectId(userId),
        "author": "Glassdoor",
        "title": "If they don't push you, you can enjoy with this job",
        "body": "Pros: You can have good benefit and their management is friendly Cons:If you work hard, pain in your feet, but if you don't push this job, you can enjoy.",
        "postType": "Glassdoor",
        "avatar": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "url": "https://www.glassdoor.ca/Reviews/Amazon-Reviews-E6036.htm",
        "articleImage": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "companyTags": ['AMZN'],
        "sentimentScore1": 100,
        "sentimentScore2": 0,
        "sentimentScore3": 0,
        "sentimentType":"positive",
        "keywords":['AMZN'],
        "date": "February 22, 2020"

    },
        {
        "user": ObjectId(userId),
        "author": "Glassdoor",
        "title": "Make a difference while growing as a human being- this is the place to do it.",
        "body": "Pros: * Great compensation * Amazing culture * Not obsessed with degrees (CEO is a dropout, too!) (fair opportunity) * Super impactful work, easy to feel incredibly fulfilled in it * steady stable hours * clear and direct expectations * personal as well as professional growth coaching * ^ No actually though- My leadership has helped me grow more than my therapist. ;) * did I mention the inclusivity? * those perks, though. * Amazing health and dental benefits with the option to maximize them to be even better (Really great for families with kids who need braces etc * 1 year of salary top up for parental leave to like 85% of your wage. (So not neccesary, but so so good) * Baby bonus? Have a baby, get $1000! * Shares in the company (5k USD worth. Stellar!) * Incredible leadership * Incredible senior leadership * more opportunities for growth than you will know what to do with * Cons:I honestly can't think of any. Oh! Got one. I work remote, so I don't leave my house enough. Shopify has that covered though, I could expense with my spending account a sitter to watch my kid while I hit the Gym with the gym membership I *also* expensed to my spending account. I just don't do that ;)",
        "postType": "Glassdoor",
        "avatar": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "url": "https://www.glassdoor.ca/Reviews/Shopify-Reviews-E675933.htm",
        "articleImage": "https://www.glassdoor.com/employers/app/uploads/sites/2/2017/04/new-glassdoor-icon-1.jpg",
        "companyTags": ['SHOP'],
        "sentimentScore1": 100,
        "sentimentScore2": 0,
        "sentimentScore3": 0,
        "sentimentType":"positive",
        "keywords":['SHOP'],
        "date": "February 22, 2020"

    },


    ]
    return posts


posts = InsertGlassdoorToStockfeed(userProfile)
print(posts)
stockfeed.insert_many(posts)
