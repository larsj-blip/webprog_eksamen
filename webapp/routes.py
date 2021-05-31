""" import app """
from models import User, UnauthUser
from database import db_session
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response


@app.route('/', method=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/home', method=['GET'])
def index():
    return app.send_static_file('index.html')

""" @app.route('/users', method=['GET']) #get username(???) """

@app.route('/users', method=['POST']) #create user
def create_user():
    email = request.form.get(email)
    password = request.form.get(password)
    username = request.form.get(username)
    if not User.query.filter_by(User.email == email) or not UnauthUser.query.filter_by(UnauthUser.email == email) :
        new_user = UnauthUser(email, username, password)
        UnauthUser.query.add(new_user)
        response = {'success':True}
        return make_response(jsonify(response, 201))#return json response success
    response = {'success':False}
    return make_response(jsonify(response, 400))#return json response failed
    
""" @app.route('/users', method=['PUT']) #update (authorize user /change privilege/ change pass)

@app.route('/users', method=['DELETE']) #delete account """

@app.route('/session', method=['POST']) #create new sessio
def login():
    username = request.form.get(email)
    passwd = request.form.get(passwd)

    user = User.query.filter_by(User.email == email)
    if not user or not check_password_hash(user.password, passwd):
        return response(status=400) #json message fail
    login_user(user)
    return response(status=200)#json message success

@app.route('/session', method=['DELETE']) #delete session/log out
def logout():
    logout_user()
    return response(status=200)
""" 
@app.route('/video', method=['GET']) #fetch video

@app.route('/video', method=['POST']) #upload video

@app.route('/video', method=['PUT']) #superfluous?

@app.route('/video', method=['DELETE']) #remove video

@app.route('/calendar', method=['GET']) #get events

@app.route('/calendar', method=['POST']) #create event

@app.route('/calendar', method=['PUT']) # update event

@app.route('/calendar', method=['DELETE']) #remove event

 """