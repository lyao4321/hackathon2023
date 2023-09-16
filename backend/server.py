from flask import Flask, request, jsonify
from flask_jwt_extended import JWT, jwt_required
from pymongo import MongoClient

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Hello, World!'})


@app.route('/login', methods=['POST'])
def login():
        return 




if __name__ == '__main__':
    app.run(debug=True)
