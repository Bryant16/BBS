from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Note
from app.config import Config
import boto3

# s3 = boto3.resource('s3',
#                   aws_access_key_id=Config.ACCESS_KEY_ID,
#                   aws_secret_access_key=Config.ACCESS_SECRET_KEY)

# BUCKET_NAME = 'bbscouting'
images_routes = Blueprint('images', __name__)


@images_routes.route('/', methods=['POST'])
def handle_image_upload():
    img = request.files
    if img:
        print(img)
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        print('=====================')
        return jsonify({'hiii':True})
    else:
        return jsonify({'no':True})