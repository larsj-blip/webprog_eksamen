
from flask import Flask, request, g
from flask_wtf import FlaskForm
import json
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
db = SQLAlchemy(app)

#TODO create env variable for secret key
app.config['SECRET_KEY'] = 'verylongstring, store somewhere else not in plaintext'

#kanskje prøve å fyre opp docker igjen? må kanskje lære meg 


@app.route('/', methods='GET')
def index():
    return app.send_static_file('index.html')

