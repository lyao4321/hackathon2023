    import os
from dotenv import load_dotenv
from pymongo import MongoClient
# from bson.objectid import ObjectId
# from bson.json_util import dumps
from pymongo.mongo_client import MongoClient

load_dotenv()

uri = os.getenv('MONGO_URI')

client = MongoClient(uri)

db = client['hackathon2023']

client_users = db['client_users']
company_users = db['company_users']


def client_insert(data):
    client_users.insert_one(data)


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

