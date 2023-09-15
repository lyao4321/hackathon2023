from flask import Flask, request, jsonify


app = Flask(__name__)



@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Hello, World!'})
    