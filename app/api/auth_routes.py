from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db
from app.forms import LoginForm,RequestResetForm,ResetPasswordForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from flask_mail import Message

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return jsonify({'user': current_user.to_dict()})
    return jsonify({'user':{'errors': ['Unauthorized']}})


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
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
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
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


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return jsonify({'user':{'errors': ['Unauthorized']}}), 401

def send_reset_email(user):
    print('in email reset')
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender='bbscouting16@gmail.com', recipients=[user.email])
    msg.body = f'''To Reset your password, visit the following link: {f'https://localhost:3000/reset-password'}
    '''
    mail.send(msg)

@auth_routes.route('/reset_password', methods=['POST'])
def reset_request():
#     if current_user.is_authenticated:
#         return jsonify({'user':True})
    form = RequestResetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            user = User.query.filter(User.email == 'kleinb1616@gmail.com').first()
            print(user)
            print('--------------')
            print('--------------')
            print('--------------')
            print('--------------')
            print('--------------')
            print('--------------')
            send_reset_email(user)
            return jsonify({'email':True})
        except:
            return jsonify({'email':False})
    return jsonify({'worked':True})

@auth_routes.route('/reset_password/<token>', methods=['GET','POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return jsonify({'user':True})
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token')
        return redirect(url_for('reset_request'))
    form = RestPasswordForm()
    if form.validate_on_submit():
        new_password=form.data['password']
        user.password = new_password
        db.session.commit()
        login_user(user)
        return jsonify({'user': user.to_dict()})

def test():
    return 'https://bbscouting.herokuapp.com'