import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_mail import Mail
from flask_mail import Message

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.players_routes import players_routes
from .api.notes_routes import notes_routes
from .api.media_routes import media_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(players_routes, url_prefix='/api/players')
app.register_blueprint(notes_routes, url_prefix='/api/notes')
app.register_blueprint(media_routes, url_prefix='/api/media')
db.init_app(app)
Migrate(app, db)

CORS(app)
mail = Mail(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

@app.route('/passwordreset/<email>')
def password_reset(email):
    user = User.query.filter(User.email == email).first()
    token = 1232
    if user:
        msg = Message('Link To Reset Password', sender ='bbscouting16@gmail.com', recipients = [user.email])
        msg.body = f"Please follow the link http://localhost:3000/reset/{token} to reset your password for BBScouting."
        mail.send(msg)
        return jsonify({'user': user.to_dict()})
    else:
        return jsonify({'user': False})
