    
def register_user(client):
    return client.post('/users', json={
        'email': 'flask@example.com', 'username':'lars', 'password': 'secret'
    })

def test_basic_register(test_client):
    response = register_user(test_client)
    reply = response.get_json()
    assert reply.status_code() == 200