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
companies_DB = db['companies_db']


def client_insert(data):
    client_users.insert_one(data)
def company_insert(data):
    company_users.insert_one(data)

def companies_insert(data):
    companies_DB.insert_one(data)

def get_client_either_email_or_username(credential):
    return client_users.find_one({
        credential
    })

def get_all_companies():
    return companies_DB.find()



try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
