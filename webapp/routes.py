


@app.route('/', methods=['GET'])
@app.route('/home', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/user', methods=['GET']) #authentication?

@app.route('/user', methods=['POST']) #create

@app.route('/user', methods=['PUT']) #update (change pass)

@app.route('/user', methods=['DELETE']) #delete account

@app.route('/video', methods=['GET']) #fetch video

@app.route('/video', methods=['POST']) #upload video

@app.route('/video', methods=['PUT']) #superfluous?

@app.route('/video', methods=['DELETE']) #remove video

@app.route('/calendar', methods=['GET']) #get events

@app.route('/calendar', methods=['POST']) #create event

@app.route('/calendar', methods=['PUT']) # update event

@app.route('/calendar', methods=['DELETE']) #remove event


#TODO: lag flere routes basert på sånn supergay 
