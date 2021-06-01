from app import app, db
from models import User, UnauthUser

from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response
import json


@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/users', methods=['GET']) #get all users
def return_all_users():
    usersList = User.query.all()
    return usersList #flask runs jsonify() automatically on dicts
    

@app.route('/users', methods=['POST']) #create user
def create_user():
    user = json.loads(request.data)
    if not User.query.filter_by(User.email == user.email) or not UnauthUser.query.filter_by(UnauthUser.email == user.email) :
        new_user = UnauthUser(email, username, password)
        UnauthUser.query.add(new_user)
        response = {'success':True}
        return make_response(jsonify(response, 200))#return json response success
    response = {'success':False}
    return make_response(jsonify(response, 400))#return json response failed
    
""" @app.route('/users', methods=['PUT']) #update (authorize user /change privilege/ change pass)

@app.route('/users', methods=['DELETE']) #delete account """

@app.route('/session', methods=['POST']) #create new session
def login():
    username = request.form.get(email)
    passwd = request.form.get(passwd)

    user = User.query.filter_by(User.email == email)
    if not user or not check_password_hash(user.password, passwd):
        return response(status=400) #json message fail
    login_user(user)
    return response(status=200)#json message success

@app.route('/session', methods=['DELETE']) #delete session/log out
def logout():
    logout_user()
    return response(status=200)
""" 
@app.route('/video', methods=['GET']) #fetch video

@app.route('/video', methods=['POST']) #upload video

@app.route('/video', methods=['PUT']) #superfluous?

@app.route('/video', methods=['DELETE']) #remove video

@app.route('/calendar', methods=['GET']) #get events

@app.route('/calendar', methods=['POST']) #create event

@app.route('/calendar', methods=['PUT']) # update event

@app.route('/calendar', methods=['DELETE']) #remove event

 """