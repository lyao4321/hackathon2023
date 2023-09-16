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
@app.route('/api/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    print(data)
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
    }

    db.client_users.insert_one(new_user)
    token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token}), 200 

if __name__ == '__main__':
    app.run(debug=True)
