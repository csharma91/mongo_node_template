from azure.ai.textanalytics import TextAnalyticsClient, TextAnalyticsApiKeyCredential

# Documentation
doc = '''https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quickstarts/text-analytics-sdk?tabs=version-3&pivots=programming-language-python#sentiment-analysis'''


key = "dd67128a5a8d45f9b19149c5f5ae6322"
endpoint = "https://textanalyticsstocktok.cognitiveservices.azure.com/"


def authenticate_client():
    ta_credential = TextAnalyticsApiKeyCredential(key)
    text_analytics_client = TextAnalyticsClient(
        endpoint=endpoint, credential=ta_credential)
    return text_analytics_client


client = authenticate_client()


def sentiment_analysis_example(client, textBody):

    document = [str(textBody)]
    response = client.analyze_sentiment(inputs=document)[0]
    print("Document Sentiment: {}".format(response.sentiment))
    print("Overall scores: positive={0:.3f}; neutral={1:.3f}; negative={2:.3f} \n".format(
        response.sentiment_scores.positive,
        response.sentiment_scores.neutral,
        response.sentiment_scores.negative,
    ))


def key_phrase_extraction_example(client, textBody):

    try:
        document = [str(textBody)]

        response = client.extract_key_phrases(inputs=document)[0]

        if not response.is_error:
            print("\tKey Phrases:")
            for phrase in response.key_phrases:
                print("\t\t", phrase)
        else:
            print(response.id, response.error)

    except Exception as err:
        print("Encountered exception. {}".format(err))


textBody = '''As an Instant Pot owner, my new favorite thing that I discovered recently is the Instant Pot Air Fryer Lid , which is a new official Instant Pot accessory that was 
just released recently. I recently upgraded from the Duo 60 to the Instant Pot Duo Evo Plus , and I can't tell you how much I'm enjoying the new model. It has nine 
different cooking modes that all work so well, but I did end up kicking myself for not getting the version with the built-in air fryer. I decided at the time that it was too expensive, but so the new Air Fryer Lid allowed me to undo that mistake since it adds air frying, a dehydrator, and more to any Instant Pot model you already have. Plus, it's $60 off right now! If you already own an Instant Pot and you've been thinking about getting an air fryer, that great accessory is a no-brainer. If you're looking for a full upgrade though, or if you don't yet have any multi-cooker or air fryer, there's an all-in-one solution that's on sale today at its lowest price since Black Friday.
'''
sentiment_analysis_example(client, textBody)
key_phrase_extraction_example(client, textBody)
