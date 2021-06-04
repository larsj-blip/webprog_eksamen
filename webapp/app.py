from datetime import timedelta
from flask import Flask, request, g
""" from flask_wtf import FlaskForm """
import json #for AJAX
from flask_login import LoginManager #handles login
import os #handles env variables
from flask_sqlalchemy import SQLAlchemy

login_manager = LoginManager()
app = Flask(__name__)

#TODO create env variable for secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #set to null by default, disable to avoid warning
app.config['SECRET_KEY'] = 'verylongstring, stored somewhere else not in plaintext'

db = SQLAlchemy(app)
login_manager.init_app(app)

app.permanent_session_lifetime = timedelta(minutes=10)
@login_manager.user_loader
def load_user(in_email):
    return User.query.filter_by(email=in_email).first()

def populate_video_table_helper():
    import os
    from models import Video
    files_lectures = os.listdir("./videos/lectures")
    files_conferences = os.listdir("./videos/conferences")

    for file in files_lectures: #helper to populate database with files from directory. Running on mac picks up
        if "DS_Store" in file:  #.DS_Store file config type thing, code to not add those 
            continue
        new_vid = Video(file, "lecture")
        db.session.add(new_vid)
    for file in files_conferences:
        if "DS_Store" in file:
            continue
        new_vid = Video(file, "conference")
        db.session.add(new_vid)
        print(new_vid)
    db.session.commit()
    

import routes
from models import User


