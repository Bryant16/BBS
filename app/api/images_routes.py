from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Note,Image
from werkzeug.utils import secure_filename
from app.config import Config
import boto3

s3=boto3.resource('s3',
                aws_access_key_id=Config.aws_access_key_id,
                aws_secret_access_key=Config.aws_secret_access_key)

BUCKET_NAME = 'bbscouting'
images_routes = Blueprint('images', __name__)


@images_routes.route('/<int:id>', methods=['POST'])
def handle_image_upload(id):
    img = request.files['image']
    if img:
        print(img)
        # data = open('test.png' , 'rb')
        filename = secure_filename(img.filename)
        # img.save(filename)
        s3.Bucket(BUCKET_NAME).put_object(Key=filename, Body=img, ContentType=img.content_type, ACL='public-read')
        newProfilePic = Image(URL="{}{}".format('https://bbscouting.s3.amazonaws.com/',filename),player_id=id)
        db.session.add(newProfilePic)
        db.session.commit()
        return jsonify({'newPic':True})
        # return jsonify({'hiii':True})
    else:
        return jsonify({'error':['could not be processed at this time']})