from flask_login import UserMixin
import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean
from database import Base

class User(Base, UserMixin):
    __tablename__ = 'users'
    email = Column(String(50), primary_key=True)
    username = Column(String(50), nullable=False)
    video_privilege = Column(Integer, nullable=True, default=0)
    admin = Column(Boolean, nullable=False, default=False)
    password = Column(Text, nullable=False)
    active = Column(Boolean, nullable=False, default=False)
    authenticated = Column(Boolean, nullable=False, default=False)

    def __init__(self, id, username, email, password):
        self.id = id
        self. username=username
        self.email = email
        self.password = password


    def get_id(self):
        userID = self.email
        return userID

    def is_authenticated(self):
        return self.authenticated

    def is_active(self):
        return self.active

    def is_admin(self):
        return self.admin

class UnauthUser(Base):
    email = Column(String(50), primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(Text, nullable=False)

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password
""" 
class Calendar(Model): #kanskje kall "calendarEvent?"
    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    user_id = Column(Integer, nullable=False)
    #foreign key, må vel ikke være pk?



class VideoCat(Model):
    id = Column(Integer, primary_key=True)
    path = Column(String(50), nullable=False)
    
    
 """