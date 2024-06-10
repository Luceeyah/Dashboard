from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load data from db.json
with open('db.json') as f:
    data = json.load(f)

@app.route('/categories', methods=['GET'])
def get_categories():
    return jsonify(data['categories'])

@app.route('/chart', methods=['GET'])
def get_chart():
    return jsonify(data['chart'])

if __name__ == '__main__':
    app.run(debug=True, port=3000)
