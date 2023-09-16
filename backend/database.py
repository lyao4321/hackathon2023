    import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo.mongo_client import MongoClient

load_dotenv()

uri = os.getenv("mongodb+srv://adeland:boWpe6PnOM8yu7Xs@cluster0.m1cajrn.mongodb.net/?retryWrites=true&w=majority")

client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

