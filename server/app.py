from functools import wraps
import os
from flask import Flask, jsonify, make_response, redirect, request, url_for
from flask_cors import CORS
from flask_migrate import Migrate
from databaseconfig import db
from endpoints.client_api import clients
from server.endpoints.services_api import transactions
from endpoints.admin_api import admin
from endpoints.auth_api import login, logout


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

CORS(app, origins='*')  # Enable CORS with credentials support

@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
        return response


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_URI = os.getenv("DATABASE_URI")


app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI  #"sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False




migrate = Migrate(app, db)

db.init_app(app)


# Dummy user data
users = {
    'user1': {'username': 'user1', 'password': 'pass1'},
    'user2': {'username': 'user2', 'password': 'pass2'}
}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        username = request.cookies.get('username')
        if not username:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    return 'Hello World!'


@app.route('/api/protected')
@login_required
def protected():
    return jsonify({'message': 'This is a protected route'})
@app.route('/')
def index():
    return '<h3>Nexin LTD</h3>'

app.add_url_rule('/login', 'login', login, methods=['GET', 'POST'])
app.add_url_rule('/logout', 'logout', logout, methods=['GET', 'POST'])
# app.add_url_rule('/check_login', 'check_login', check_login, methods=['GET', 'POST'])
app.add_url_rule('/admin', 'admin', admin, methods=['GET', 'POST', 'PATCH', 'DELETE'])
app.add_url_rule('/clients', 'clients', clients, methods=['GET', 'POST', 'PATCH', 'DELETE'])
app.add_url_rule('/transactions', 'transactions', transactions, methods=['GET', 'POST', 'DELETE', 'PATCH'])


if __name__ == '__main__':
    app.run(port=5555, debug=True)