import os
import tempfile

from models import UnauthUser
import pytest
from database import init_db
import app

@pytest.fixture(scope="module")
def new_user():
    user = UnauthUser("lars", "lars", "lars")
    return user


@pytest.fixture(scope='module')
def test_client():
    flask_app = app #create_app('flask_test.cfg')
    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client  # this is where the testing happens!
""" @pytest.fixture
def client():
    db_fd, app.config['DATABASE'] = tempfile.mkstemp()
    app.config['TESTING'] = True
    with app.test_client() as client:
            with app.app_context():
                app.init_db()
            yield client
    os.close(db_fd)
    os.unlink(app.config['DATABASE'])
 """