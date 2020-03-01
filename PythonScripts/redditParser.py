import praw
import pythonConfig as pyConfig
from datetime import datetime


print(pyConfig.redditCreds['client_id'])
print(pyConfig.redditCreds['username'])

reddit = praw.Reddit(
    client_id=pyConfig.redditCreds['client_id'],
    client_secret=pyConfig.redditCreds['client_secret'],
    username=pyConfig.redditCreds['username'],
    password=pyConfig.redditCreds['password'],
    user_agent=pyConfig.redditCreds['user_agent']

)


subRedditList = [
    'StockMarket'

]

for subred in subRedditList:
    subreddit = reddit.subreddit(subred)
    print(subred)
    print('****')
    for submission in subreddit.search('Boyd Group Services Inc', sort='relevance', syntax='lucene', time_filter='all',):
        ts = int(submission.created_utc)
        print(datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S'))
        print(submission.title)
        print(submission.url)


# subreddit = reddit.subreddit('StockMarket')
# hot_python = subreddit.hot(limit=3)

# for submission in hot_python:
#     print('Name ----------------------')
#     print(submission.author_fullname)
#     print('Title -------------------')
#     print(submission.title)
#     print('Text Body --------------')
#     print(submission.selftext)
