from azure.ai.textanalytics import TextAnalyticsClient, TextAnalyticsApiKeyCredential
import pythonConfig as pconfig

# Documentation
doc = '''https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/quickstarts/text-analytics-sdk?tabs=version-3&pivots=programming-language-python#sentiment-analysis'''


key = pconfig.textAnalytics['key']
endpoint = pconfig.textAnalytics['endpoint']


def runTextAnalytics(textBody):

    textBody = str(textBody)

    key = pconfig.textAnalytics['key']
    endpoint = pconfig.textAnalytics['endpoint']

    def authenticate_client():
        ta_credential = TextAnalyticsApiKeyCredential(key)
        text_analytics_client = TextAnalyticsClient(
            endpoint=endpoint, credential=ta_credential)
        return text_analytics_client

    def sentiment_analysis(client, textBody):

        document = [str(textBody)]
        response = client.analyze_sentiment(inputs=document)[0]
        print("Document Sentiment: {}".format(response.sentiment))
        print("Overall scores: positive={0:.3f}; neutral={1:.3f}; negative={2:.3f} \n".format(
            response.sentiment_scores.positive,
            response.sentiment_scores.neutral,
            response.sentiment_scores.negative,
        ))
        docSentiment = response.sentiment
        docPos = response.sentiment_scores.positive
        docNeut = response.sentiment_scores.neutral
        docNeg = response.sentiment_scores.negative

        return docSentiment, docPos, docNeut, docNeg

    def key_phrase_extraction(client, textBody):

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

        return response.key_phrases

    client = authenticate_client()
    docSentiment, docPos, docNeut, docNeg = sentiment_analysis(
        client, textBody)
    key_phrase = key_phrase_extraction(client, textBody)

    return docSentiment, docPos, docNeut, docNeg, key_phrase
