from flask import Flask, request, g
""" from flask_wtf import FlaskForm """
import json #for AJAX
from flask_login import LoginManager #handles login
import os #handles env variables
from database import init_db
from models import User

init_db() #init av db i minne
app = Flask(__name__)

login_manager = LoginManager()
#TODO create env variable for secret key
app.config['SECRET_KEY'] = 'verylongstring, stored somewhere else not in plaintext'

login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

import routes


