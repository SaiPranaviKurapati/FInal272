from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import json_util

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")  
db = client["mydatabase"]  
CORS(app)  

@app.route('/api/register', methods=['POST'])
def register():
    user_data = request.get_json()
    username = user_data['username']
    password = user_data['password']
    
    user = db.users.find_one({'username': username})
    if user:
        return jsonify({'message': 'Username already exists'}), 409
    
    db.users.insert_one({'username': username, 'password': password})
    return jsonify({'message': 'Registration successful'})

@app.route('/api/login', methods=['POST'])
def login():    
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db.users.find_one({'username': username})

    if user and user['password'] == password:
        return jsonify({'message': 'Login successful'}),200
    else:
        return jsonify({'message': 'Login failed'}),400
    
@app.route('/api/createTask', methods=['POST'])
def createTask():
    task_data = request.get_json()
    print(task_data)
    project = task_data.get('project')
    issuetype = task_data.get('issuetype')
    status = task_data.get('status')
    summary = task_data.get('summary')
    description = task_data.get('description')
    assignee = task_data.get('assignee')
    reporter = task_data.get('reporter')
    
    db.taskDeatils.insert_one({'project': project, 'issuetype': issuetype,'status':status,'summary':summary,'description':description,'assignee':assignee,'reporter':reporter})
    return jsonify({'message': 'Created task successfully'})

@app.route('/', methods=['GET'])
def get_details():
    done_data= list(db.taskDeatils.find({'status':'done'}))
    todo_data= list(db.taskDeatils.find({'status':'to-do'}))
    inprogress_data= list(db.taskDeatils.find({'status':'in-progress'}))
    
    done_data = json_util.dumps(done_data)
    todo_data = json_util.dumps(todo_data)
    inprogress_data = json_util.dumps(inprogress_data)
    
    return jsonify(done = done_data, todo = todo_data, inprogress = inprogress_data)


if __name__ == '__main__':
    app.run(debug=True)