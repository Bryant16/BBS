from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Note, Image, Video
from werkzeug.utils import secure_filename
from app.config import Config
import boto3
import mimetypes
import magic

mime = magic.Magic(mime=True)
s3=boto3.resource('s3',
                aws_access_key_id=Config.aws_access_key_id,
                aws_secret_access_key=Config.aws_secret_access_key)

BUCKET_NAME = 'bbscouting'
media_routes = Blueprint('media', __name__)


@media_routes.route('/images/<int:id>')
def get_player_url(id):
    playerUrl = Image.query.filter(Image.player_id == id).all()
    urls = [player.to_dict() for player in playerUrl]
    last = urls[len(urls)-1]
    try:
        return jsonify(last)
    except:
        return jsonify({'imageurl':False})

@media_routes.route('/images/<int:id>', methods=['POST'])
def handle_image_upload(id):
    img = request.files['image']
    if img:
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

@media_routes.route('/videos/<int:id>', methods=['POST'])
def handle_video_upload(id):
    vid = request.files['video']
    if vid:
        content = vid.content_type
        try:
            filename = secure_filename(vid.filename)
            s3.Bucket(BUCKET_NAME).put_object(Body=vid, Key=filename, ContentType=content, ACL='public-read')
            newVideo = Video(content= f'https://bbscouting.s3.amazonaws.com/{filename}', player_id=id)
            db.session.add(newVideo)
            db.session.commit()
            return jsonify({'video_url':  f'https://bbscouting.s3.amazonaws.com/{filename}'})
        except:
            return jsonify({'upload':False})

@media_routes.route('/videos/<int:id>')
def get_videos(id):
    videos = Video.query.filter(Video.player_id == id).order_by(Video.id.desc()).all()
    try:
        return jsonify({'videos': [video.to_dict() for video in videos]})
    except:
        return jsonify({'videos':False})