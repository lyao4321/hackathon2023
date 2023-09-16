from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo.mongo_client import MongoClient

uri = "mongodb+srv://adeland:boWpe6PnOM8yu7Xs@cluster0.m1cajrn.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

