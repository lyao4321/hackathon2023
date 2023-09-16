from flask import Flask, request, jsonify
# from flask_jwt_extended import JWT, jwt_required
import database as db
import os
from dotenv import load_dotenv
import jwt
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

CORS(app)

@app.route('/api/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data:
        return jsonify({'error': 'email is required'}), 400
    email = data['email']
    # Check if the email exists in the database
    user = db.client_users.find_one({'email': email})

    # If the user is not found in the database
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        # Generate a JWT token for the user and return it
        token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': token.decode('UTF-8')})
    


        




if __name__ == '__main__':
    app.run(debug=True)
