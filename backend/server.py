from flask import Flask, request, jsonify
import database as db
import os
from dotenv import load_dotenv
import jwt
from flask_cors import CORS

load_dotenv()

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
        'age':'',
        'location': '',
        'industry': '',
        'experience': '',
        'university': '',
        'hours': 0,
        'skills': '',
    }
    db.client_users.insert_one(new_user)
    token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm='HS256')
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
            'gender', 'age', 'location', 'interests', 'industry', 'experience', 'university', 'hours', 'skills'
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
            {'username': decoded['username']}
        ]
    })
        print(current_user)
        return jsonify({'token': token}), 200
    except:
        return jsonify({'verified': False}), 401

        
if __name__ == '__main__':
    app.run(debug=True)
