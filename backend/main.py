from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson import json_util
from bson.json_util import dumps
import itertools
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27017/")  
db = client["mydatabase"]  
CORS(app)  

@app.route('/api/getTask', methods=['GET'])
def lists():
    data = list(db.taskDeatils.find({}))
    resp = dumps(data)
    return resp


@app.route('/api/updateTask/<id>/<new_status>', methods=['PUT'])
def update_task_status(id,new_status):
    try:
        document_id = ObjectId(id)
        db.taskDeatils.update_one({'_id': document_id}, {'$set': {'status': new_status}})
        return jsonify({'message': 'Task updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

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

# @app.route('/', methods=['GET'])
# def get_details():
#     done_data= list(db.taskDeatils.find({'status':'done'}))
#     todo_data= list(db.taskDeatils.find({'status':'to-do'}))
#     inprogress_data= list(db.taskDeatils.find({'status':'in-progress'}))
    
#     done_data = json_util.dumps(done_data)
#     todo_data = json_util.dumps(todo_data)
#     inprogress_data = json_util.dumps(inprogress_data)
    
#     return jsonify(done = done_data, todo = todo_data, inprogress = inprogress_data)

@app.route('/api/getProjects', methods=['GET','POST'])
def get_projects():
    projects_from_mongodb = list(db.projects.find())
    db.projects.insert_one({'projectname': 'hi', 'projectdescription': 'hi'})
    
    # Transform the data into the desired format
    projects = []
    
    for project in projects_from_mongodb:
        project_data = {
            'id': str(project['_id']),  # Use the MongoDB ObjectId as the 'id'
            'name': project.get('projectname', ''),  # Use .get() to handle missing keys
            'description': project.get('projectdescription', '')  # Use .get() to handle missing keys
        }
        projects.append(project_data)

    return jsonify(projects)
# @app.route('/api/graph')
# def get_data():
#     # Return sample data for testing
#     data = {'labels': ['To-do', 'In Progress', 'Done'],
#             'values': [30, 50, 20]}
#     return jsonify(data)
@app.route('/api/graph', methods=['GET'])
def get_details():
    done_count = db.taskDeatils.count_documents({'status': 'done'})
    todo_count = db.taskDeatils.count_documents({'status': 'to-do'})
    inprogress_count = db.taskDeatils.count_documents({'status': 'in-progress'})
    print(done_count)
    print(todo_count)
    print(inprogress_count)
    data = {'labels': ['To-do', 'In Progress', 'Done'],
           'values': [todo_count, inprogress_count,done_count]}

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
