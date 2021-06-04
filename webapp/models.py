from flask_login import UserMixin
import datetime
from app import db


class User(db.Model, UserMixin):
    #__tablename__ = 'users'
    email = db.Column(db.String(50), primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text, nullable=False)
    authorized_user = db.Column(db.Boolean, nullable=False, default=False)
    video_privilege = db.Column(db.Integer, nullable=True, default=0) #binært: conferences - lectures
    admin = db.Column(db.Boolean, nullable=False, default=False)
    appointments =  db.relationship("CalendarEvent", backref='User', lazy=True)
    active = db.Column(db.Boolean, nullable=False, default=False)
    authenticated = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, email, username, passwd, **kwargs):
        super().__init__(**kwargs)
        self.email = email
        self.password = passwd
        self.username = username

    def get_id(self):
        userID = self.email
        return userID

    def is_admin(self):
        return self.admin

    def jsonrepr(self):
        return{"email":self.email, "username":self.username, "authorized_user":self.authorized_user, "video_privilege":self.video_privilege}

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(11), nullable=False)

    def __init__(self, path, category, **kwargs):
        super().__init__(**kwargs)
        self.path = path
        self.category = category

    def jsonrepr(self): 
        return{'path':self.path, 'category':self.category}



class CalendarEvent(db.Model): #kanskje kall "calendarEvent?"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    email = db.Column(db.String(50), db.ForeignKey(User.email), nullable=False)
    
    def __init__(self, email, **kwargs):
        super().__init__(**kwargs)
        self.email = email
    
    def jsonrepr(self):
        return{'date':self.date, 'email':self.email}
    #foreign key, må vel ikke være pk?



