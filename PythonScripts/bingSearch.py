from azure.cognitiveservices.search.customsearch import CustomSearchClient
from msrest.authentication import CognitiveServicesCredentials
import pandas as pd
import pythonConfig as pconfig

subscription_key = pconfig.bingSearch['subscription_key']
endpoint = pconfig.bingSearch['endpoint']


def bingSearchAPI(query):
    qry = []
    name = []
    url = []

    client = CustomSearchClient(
        endpoint=endpoint, credentials=CognitiveServicesCredentials(subscription_key))

    web_data = client.custom_instance.search(
        query=query, custom_config=pconfig.bingSearch['custom_config'])

    if web_data.web_pages.value:

        for web_result in web_data.web_pages.value:
            qry.append(query)
            name.append(web_result.name)
            url.append(web_result.url)
            # both lists, with columns specified
            print("Web Pages result count: {}".format(
                len(web_data.web_pages.value)))
            print("Web Page name: {}".format(web_result.name))
            print("Web Page url: {}".format(web_result.url))
    else:
        print("Didn't see any web data..")

    df = pd.DataFrame(list(zip(qry, name, url)),
                      columns=['Qry', 'Name', 'URL'])

    # Returns List of Results
    return df
