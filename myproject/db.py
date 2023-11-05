import pymongo

import config

url = config.URL

client = pymongo.MongoClient(url)

db = client['pyproject']


