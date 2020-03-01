from azure.cognitiveservices.search.customsearch import CustomSearchClient
from msrest.authentication import CognitiveServicesCredentials
import pythonConfig as pconfig

subscription_key = pconfig.bingSearch['subscription_key']
endpoint = pconfig.bingSearch['endpoint']

client = CustomSearchClient(
    endpoint=endpoint, credentials=CognitiveServicesCredentials(subscription_key))

web_data = client.custom_instance.search(
    query="shopify class a shares glassdoor reviews", custom_config=pconfig.bingSearch['custom_config'])

if web_data.web_pages.value:
    first_web_result = web_data.web_pages.value

    print("Web Pages result count: {}".format(len(web_data.web_pages.value)))
    print("First Web Page name: {}".format(first_web_result.name))
    print("First Web Page url: {}".format(first_web_result.url))
else:
    print("Didn't see any web data..")
