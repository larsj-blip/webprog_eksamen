def test_create user(new_user):
    assert new_user.username == "lars"
    assert new_user.password == "lars"

def server_communication(new_user):