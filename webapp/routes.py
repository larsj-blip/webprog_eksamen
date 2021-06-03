from app import app, db
from models import User

from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response, request
from flask_login import login_required, login_user, current_user, logout_user
import json



@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/users', methods=['GET']) #get all users
@login_required
def return_all_users():
    if current_user.is_admin(): 
        usersList = []
        all_users = User.query.all()
        for user in all_users: #get all Users
            x = user.jsonrepr()
            usersList.append(x)
        return json.dumps(usersList) #flask runs jsonify() automatically on dicts
    return make_response("shitty titty", 400)

@app.route('/users', methods=['POST']) #create user
def create_user():
    user = json.loads(request.data)
    if not User.query.filter_by(email=user['email']).first():
        password = generate_password_hash(user["passwd"])
        new_user = User(user["email"], user["username"], password)
        db.session.add(new_user)
        db.session.commit()
        print(User.query.all())
        return make_response("shit", 200)#return json response success
    return make_response("shit", 400)#return json response failed


@app.route('/users', methods=['PUT']) #update (authorize user /change privilege/ change pass)
@login_required
def update_privileges():
    print(current_user.is_authenticated)
    if current_user.is_admin():
        users = json.loads(request.data)
        print(users)
        try:
            for jsonUser in users:
                dbUser = User.query.filter_by(email=jsonUser["email"]).first()
                print(dbUser, dbUser.authorized_user)
                dbUser.authorized_user, dbUser.video_privilege = jsonUser["authorized_user"], jsonUser["video_privilege"]
                db.session.commit()
                print(dbUser.authorized_user)
            return make_response("success", 201)
        except:
            return make_response("failure", 400)
    return make_response("failure", 400)


"""@app.route('/users', methods=['DELETE']) #delete account """

@app.route('/session', methods=['POST']) #create new session
def login():
    data = json.loads(request.data)
    user = User.query.filter_by(email=data["email"]).first()
    if not user or not check_password_hash(user.password, data["passwd"]):
        return make_response("failure", 400) #send server error code
    user.authenticated = True
    login_user(user)
    return make_response(jsonify({'is_admin':user.is_admin()}), 200)#server success code

@app.route('/session', methods=['DELETE']) #delete session/log out
@login_required
def logout():
    current_user.authenticated = False
    logout_user()
    return make_response("u logged out as hell", 200)
 
""" @app.route('/videos/<num>', methods=['GET']) #fetch video
def get_video():
    return """
"""
@app.route('/videos', methods=['POST']) #upload video

@app.route('/video', methods=['PUT']) #superfluous?

@app.route('/video', methods=['DELETE']) #remove video

@app.route('/calendar', methods=['GET']) #get events

@app.route('/calendar', methods=['POST']) #create event

@app.route('/calendar', methods=['PUT']) # update event

@app.route('/calendar', methods=['DELETE']) #remove event

 """