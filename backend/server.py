from flask import Flask, request, jsonify
# from flask_jwt_extended import JWT, jwt_required
import database as db
import os
from dotenv import load_dotenv
import jwt

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Hello World'})


@app.route('/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    username = data['username']
    user = db.client_users.find_one({'username': 'camerontoy'})
    print(user)
    if user is None:
        return user
    else:
        token = jwt.encode({'username': 'camerontoy'}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})
    


        




if __name__ == '__main__':
    app.run(debug=True)
