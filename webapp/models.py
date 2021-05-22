from app import db
from flask_login import UserMixin
import datetime

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    video_privilege = db.Column(db.Integer, nullable=True)
    admin = db.Column(db.Boolean, nullable=False)
    password = db.Column(db.Text, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    authenticated = db.Column(db.Boolean, nullable=False)

    def get_id(self):
        userID = self.id
        return userID

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return self.active

    def is_admin(self):
        return self.admin


class Calendar(db.Model): #kanskje kall "calendarEvent?"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    #foreign key, må vel ikke være pk?



class VideoCat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(50), nullable=False)
    
    
