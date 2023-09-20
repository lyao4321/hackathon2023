from flask import Flask, request, jsonify
import database as db
import os
from dotenv import load_dotenv
import jwt
from flask_cors import CORS
import pandas as pd
load_dotenv()
from reccomendation import get_matches



class RecommendationObject:
    def __init__(self):
        self.numerical_attributes = ["startup_experience"]
        self.categorical_attributes = ["gender", "location", "industry"]
        self.attribute_weights = { "location": 3.0, "startup_experience": 2.0, "industry": 2.0, "gender": 1.0 }
        self.target = None
        self.specs = None
        self.data = None
        self.num_recommendations = 5


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)
@app.route('/api/mlogin', methods=['GET','POST'])
def mlogin():
    data = request.get_json()
    if not data or 'credential' not in data:
        return jsonify({'error': 'email is required'}), 400
    credential = data['credential']
    # Check if the email exists in the database
    user = db.company_users.find_one({
        '$or': [
            {'email': credential}        ]
    })
    # If the user is not found in the database
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        # Generate a JWT token for the user and return it
        token = jwt.encode({'username': credential}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200  # Added 200 response code here

@app.route('/api/mregister', methods=['POST'])
def mregister():
    data = request.get_json()
    print(data)
    email = data['email']
    print(email)
    existUser = db.company_users.find_one({'email': email})
    print('exit')
    if existUser:
        return jsonify({'error' : 'existing email in use'}), 400
    
    company  = data.get('company')
    password = data.get('password')  
    new_user = {
        'username':'',
        'company': company,
        'email': email,
        'password': password,
        'client': False,
        'gender':'',
        'age':'',
        'location': '',
        'industry': '',
        'experience': '',
        'skills': '',
    }
    try:
        db.company_users.insert_one(new_user)
    except:
        print('exception')  

    print('insert')
    token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm='HS256')
    print(token)
    return jsonify({'token': token}), 200 
    

@app.route('/api/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    if not data or 'credential' not in data:
        return jsonify({'error': 'email is required'}), 400
    credential = data['credential']
    # Check if the email exists in the database
    user = db.client_users.find_one({
        '$or': [
            {'email': credential},
            {'username': credential}
        ]
    })
    # If the user is not found in the database
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        # Generate a JWT token for the user and return it
        token = jwt.encode({'username': credential}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token}), 200  # Added 200 response code here

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    email = data['email']
    existUser = db.client_users.find_one({'email': email})
    if existUser:
        return jsonify({'error' : 'existing email in use'}), 400
    username = data.get('username')
    password = data.get('password')  
    new_user = {
        'username': username,
        'email': email,
        'password': password,
        'client': True,
        'gender':'',
        'age':0,
        'location': '',
        'industry': '',
        'interests':'',
        'experience': '',
        'university': '',
        'hours': 0,
        'skills': '',
        'received_connects': []
    }
    db.client_users.insert_one(new_user)
    token = jwt.encode({'username': username}, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token}), 200 

@app.route('/api/mform', methods=['POST'])
def mform():
    data = request.get_json()
    print(data)
    token = request.headers.get('Authorization')
    print(token)
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'], verify=True)
        current_user = db.company_users.find_one({
                {'username': decoded['username']}
        })

        print(current_user)

        allowed_fields = [
            'location','industry', 'experience', 'company', 'skills'
        ]
        update_data = {key: data[key] for key in allowed_fields if key in data}
        db.company_users.update_one(current_user, {'$set': update_data})
        return jsonify({'verified': True}), 200
    except:
        return jsonify({'verified': False}), 401
    
   
@app.route('/api/form', methods=['POST'])
def form():
    data = request.get_json()
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'], verify=True)
        # Ensure only allowed fields are updated
        current_user = db.client_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    })
        allowed_fields = [
             'gender', 'age','location', 'industry', 'interests', 'experience', 'university', 'hours', 'skills'
        ]
        update_data = {key: data[key] for key in allowed_fields if key in data}
        db.client_users.update_one(current_user, {'$set': update_data})
        return jsonify({'token': token}), 200
    except:
        return jsonify({'verified': False}), 401

@app.route('/api/recomendations', methods=['POST'])
def getMatches():
    data = request.json()
    token = request.headers.get('Authorization').split(' ')[-1]
    try:
        decode = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'], verify=True)
        current_user = db.client_users.find_one({
        '$or': [
            {'username': decode['username']}
        ]
    })
        print(current_user)
        return jsonify({'token': token}), 200
    except:
        return jsonify({'verified': False}), 401

@app.route('/api/userprofile', methods=['GET'])
def userprofile():
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    if not token:
        return jsonify({'error': 'token is missing'}), 400
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        print(decoded)
        current_user = db.client_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    }
                                  )
        print(current_user)
        profile_details = {
            "age": current_user['age'],
            "gender": current_user['gender'],
            "location": current_user['location'],
            "industry": current_user['industry'],
            "interests": current_user['interests'],
            "startupExperience": current_user['experience'],
            "university": current_user['university'],
            "hours": current_user['hours'],
            "skills": current_user['skills']
        }
        print(profile_details)
        return jsonify({'username': current_user['username'],
                        'email': current_user['email'],
                        'avatar': 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
                            current_user['email'], 128),
                         'profile': profile_details}), 200
    except:
        return jsonify({'error': 'token is invalid'}), 400
    
@app.route('/api/edituserprofile', methods=['POST'])
def edituserprofile():
    data = request.get_json()
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    else:
        return jsonify({'error': 'token is missing'}), 400
    try:
        
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        current_user = db.client_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    })
    except:
        return jsonify({'error': 'token is invalid'}), 400

@app.route('/api/updateprofile', methods=['POST'])
def updateprofile():
    data = request.get_json()
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        current_user = db.client_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    })
        field = data['field'].lower()
        value = data['value']
        current_username = current_user['username']
        filter_query = {"username": current_username}
        update_query = {'$set': {field: value}}
        db.client_users.update_one(filter_query, update_query)
        return jsonify({'sucess': 'sucess'}), 200
    
    except:
        return jsonify({'error': 'token is invalid'}), 400
        
@app.route('/api/getCompanies', methods=['GET'])
def getCompanies():
    try:
        companies = db.companies_DB.find()
        companies_list = [{
            "name": company['name'],
            "industry": company['industry'],
            "location": company['location'],
            "description": company['description']
        } for company in companies]

        return jsonify({'success': 'success', 'data': companies_list}), 200
    except Exception as e:
        print(str(e))  # Log the exception for debugging
        return jsonify({'error': 'An error occurred'}), 400
    
@app.route('/api/addCompanies', methods=['POST'])
def addCompanies():
    data = request.get_json()
    try:
        db.companies_DB.insert_one({
            'name': data['name'],
            'industry': data['industry'],
            'location': data['location'],
            'description': data['description'],
        })
        return jsonify({'sucess': 'sucess'}), 200
    except:
        return jsonify({'error': 'token is invalid'}), 400

@app.route('/api/getRecMentee', methods=['POST'])
def getRecMentee():
    data = request.get_json()
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        current_user = db.client_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    })
        print(current_user)
        company_users = db.company_users.find()
        print(company_users)
        # Convert the MongoDB cursor to a list first
        target_list = list(company_users)
        target = pd.DataFrame(target_list)
        print(target)

        # For a single MongoDB document
        specs = pd.DataFrame([current_user])
        print(specs)

        obj = RecommendationObject()
        obj.numerical_attributes = ["experience"]
        obj.categorical_attributes = ["location", "industry"]
        obj.attribute_weights = {
            "location": 3.0,
            "experience": 2.0,
            "industry": 2.0,
        }
        obj.target = target.copy() 
        obj.specs = specs.copy()
        obj.data = data.copy()  
        obj.num_recommendations = 5
        rec = get_matches(obj)
        return jsonify({'rec': rec}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'verified': False}), 401
    
@app.route('/api/getRecMentor', methods=['POST'])
def getRecMentor():
    data = request.get_json()
    token = request.headers.get('Authorization')
    if token and token.startswith("Bearer "):
        token = token.split(" ")[-1]
    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        current_user = db.company_users.find_one({
        '$or': [
            {'email': decoded['username']},
            {'username': decoded['username']}
        ]
    })
        # naming is flipped but it works trust me
        print(current_user)
        company_users = db.client_users.find()
        print(company_users)
        target = pd.DataFrame(list(company_users))
        specs = pd.DataFrame(list(current_user))

        obj = RecommendationObject()
        obj.numerical_attributes = ["experience"]
        obj.categorical_attributes = ["location", "industry"]
        obj.attribute_weights = {
            "location": 3.0,
            "experience": 2.0,
            "industry": 2.0,
        }
        obj.target = target.copy() 
        obj.specs = specs.copy()
        obj.data = data.copy()  
        obj.num_recommendations = 5
        rec = get_matches(obj)
        return jsonify({'rec': rec}), 200
    except:
        return jsonify({'verified': False}), 401


if __name__ == '__main__':
    app.run(debug=True)
