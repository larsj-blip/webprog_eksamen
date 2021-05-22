from flask import Blueprint

from webapp.models import User

auth_bp = Blueprint('auth_bp', __name__)