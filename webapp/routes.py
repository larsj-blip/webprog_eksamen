from app import app, db
from models import User, Video, CalendarEvent
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify, make_response, request, send_from_directory
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
    if current_user.is_admin():
        users = json.loads(request.data)
        try:
            for jsonUser in users:
                dbUser = User.query.filter_by(email=jsonUser["email"]).first()
                vid_privilege = 0
                list = [1,2]
                print(jsonUser["video_privilege"])
                for index, privilege_bool in enumerate(jsonUser["video_privilege"]):
                        if privilege_bool:
                            vid_privilege += int(list[index]) 
                print("should be int")
                print(vid_privilege)
               
                dbUser.authorized_user, dbUser.video_privilege = jsonUser["authorized_user"], vid_privilege
            db.session.commit()
            return make_response("success", 201)
        except:
            return make_response("exception", 400)

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

@app.route('/videos')
def get_video_list():
    lectures = []
    conferences = []
    vid_list = Video.query.all()
    for vid in vid_list:
        if vid.category == "lecture":
            lectures.append(vid.jsonrepr())
        else:
            conferences.append(vid.jsonrepr())
    return make_response(jsonify({'lectures':lectures, 'conferences':conferences}), 200)
 
@app.route('/videos/lectures/<filename>', methods=['GET']) #fetch video
@login_required
def get_lecture(filename):
    print(current_user.video_privilege)
    if current_user.video_privilege == 1 or current_user.video_privilege == 3:
    #sjekk bruker.tilgang
        pathname = "videos/lectures/" + filename
        return(send_from_directory(directory="", filename=pathname, as_attachment=False, cache_timeout=0))
    return(make_response("no access", 300))

@app.route('/videos/conferences/<filename>', methods=['GET']) #fetch video
@login_required
def get_conference(filename):
    print(current_user.video_privilege)
    if current_user.video_privilege == 2 or current_user.video_privilege == 3:
        #sjekk bruker.tilgang
        print(filename)
        pathname = "videos/conferences/" + filename
        print(pathname)
        return send_from_directory(directory="", filename=pathname, as_attachment=False, cache_timeout=0)
    return(make_response("no access", 300))

@app.route('/calendar', methods=['POST']) #request event creation
@login_required
def request_appointment():
    query = CalendarEvent.query.filter_by(email=current_user.email)
    if query is not None:
        for result in query:
            if result.date is None:
                print("pending")
                return make_response("already has pending request", 300)
    new_event = CalendarEvent(current_user.email)
    db.session.add(new_event)
    db.session.commit()
    return make_response("success", 200)

@app.route('/calendar', methods=['PUT']) # update event
@login_required
def confirm_appointment():
    data = json.loads(request.data)
    event = CalendarEvent.query.filter_by(email=data[0]).first()
    if event is None or event.date is not None:
        event = CalendarEvent(data[0])
    request_string = " ".join(data[1:])
    print(request_string)
    format = "%Y-%m-%d %H:%M"
    try:
        datevar = datetime.datetime.strptime(request_string, format)
        print(datevar)
        event.date = datevar
        db.session.add(event)
        db.session.commit()
        return make_response("success", 200)
    except:
        return make_response("invalid date", 300)
    

@app.route('/calendar', methods=['GET']) #get events
@login_required
def get_appointments():
    try:
        if current_user.is_admin():
            query = CalendarEvent.query.all()
        else:
            query = CalendarEvent.query.filter_by(email=current_user.email)
        events = []
        for event in query:
            events.append(event.jsonrepr())
        return make_response(jsonify({'events':events}), 200)    
    except:
        return make_response("error",400)


"""
@app.route('/videos', methods=['POST']) #upload video??

@app.route('/video', methods=['PUT']) #superfluous?

@app.route('/video', methods=['DELETE']) #remove video






@app.route('/calendar', methods=['DELETE']) #remove event

 """