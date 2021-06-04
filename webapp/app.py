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

app.permanent_session_lifetime = timedelta(minutes=1)
@login_manager.user_loader
def load_user(in_email):
    return User.query.filter_by(email=in_email).first()

import routes
from models import User


