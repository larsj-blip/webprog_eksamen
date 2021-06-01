from flask_login import UserMixin
import datetime
from app import db
from database import Base

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    email = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text, nullable=False)
    authorized_user = db.Column(db.Boolean, nullable=False, default=False)
    video_privilege = db.Column(db.Integer, nullable=True, default=0)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    active = db.Column(db.Boolean, nullable=False, default=False)
    authenticated = db.Column(db.Boolean, nullable=False, default=False)



    def get_id(self):
        userID = self.email
        return userID

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return self.active

    def is_admin(self):
        return self.admin

""" 
class Calendar(Model): #kanskje kall "calendarEvent?"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(DateTime, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    #foreign key, må vel ikke være pk?



class VideoCat(Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(50), nullable=False)
    
     """