import datetime
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
  
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    
    if current_user.is_authenticated:
        return jsonify({'user': current_user.to_dict()})
    return jsonify({'user':{'errors': ['Unauthorized']}})


@auth_routes.route('/login', methods=['POST'])
def login():
   
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return jsonify({"user": user.to_dict()})
    return jsonify({'user': {'errors': validation_errors_to_error_messages(form.errors)}}), 401


@auth_routes.route('/logout')
def logout():
   
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if User.query.filter(User.username == form.data['username']).first():
            return jsonify({'user': {'errors': validation_errors_to_error_messages({'ERROR':['Username must be unique']})}})
        elif User.query.filter(User.email == form.data['email']).first():
             return jsonify({'user': {'errors': validation_errors_to_error_messages({'ERROR':['Email must be unique']})}})
        else:
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return jsonify({'user': user.to_dict()})
    return jsonify({'user': {'errors': validation_errors_to_error_messages(form.errors)}})

@auth_routes.route('/passReset', methods=['POST'])
def reset_pass():
    data = request.get_json()
    token = data['token']
    curDate = datetime.datetime.now()
    user = User.query.filter(User.email == data['email']).first()
    if user:
        if user.resetToken == token and curDate < user.resetDate:
            user.password = data['password']
            db.session.commit()
            login_user(user)
            return jsonify({'user': user.to_dict()})
        return jsonify({'user': {'errors': ['Failed To Reset Password']}})
    return jsonify({'user': {'errors': validation_errors_to_error_messages(form.errors)}})

@auth_routes.route('/unauthorized')
def unauthorized():
    return jsonify({'user':{'errors': ['Unauthorized']}}), 401
