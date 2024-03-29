from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Player, Pitcher_Evaluation, Note, Image, Video
from werkzeug.utils import secure_filename
from app.config import Config
import boto3
from boto3.s3.transfer import TransferConfig
import mimetypes
import magic

mime = magic.Magic(mime=True)
s3 = boto3.resource('s3',
                    aws_access_key_id=Config.aws_access_key_id,
                    aws_secret_access_key=Config.aws_secret_access_key)

BUCKET_NAME = 'bbscouting'
media_routes = Blueprint('media', __name__)
multi_config = TransferConfig(
    multipart_threshold=1024 * 10,
    max_concurrency=10,
    multipart_chunksize=1024 * 5,
    use_threads=True)

@media_routes.route('/media_url/<int:id>', methods=['POST'])
def store_url(id):
    data = request.get_json()
    try:
        url = data['data']['Location']
        content_type=data['type']
        new_media = Video(content=url, content_type=content_type, player_id=id)
        db.session.add(new_media)
        db.session.commit()
        return jsonify({url : url})
    except:
        return jsonify({'imageurl': False})

@media_routes.route('/images/<int:id>')
def get_player_url(id):
    playerUrl = Image.query.filter(Image.player_id == id).all()
    urls = [player.to_dict() for player in playerUrl]
    last = urls[len(urls)-1]
    try:
        return jsonify(last)
    except:
        return jsonify({'imageurl': False})


@media_routes.route('/images/<int:id>', methods=['POST'])
def handle_image_upload(id):
    img = request.files['image']
    if img:
        filename = secure_filename(img.filename)
        s3.Bucket(BUCKET_NAME).put_object(Key=filename, Body=img,
                                          ContentType=img.content_type, ACL='public-read')
        newProfilePic = Image(URL="{}{}".format(
            'https://bbscouting.s3.amazonaws.com/', filename), player_id=id)
        db.session.add(newProfilePic)
        db.session.commit()
        return jsonify({'newPic': True})
    else:
        return jsonify({'error': ['could not be processed at this time']})


@media_routes.route('/videos/<int:id>', methods=['POST'])
def handle_video_upload(id):
    vid = request.files['video']
    size = request.form['size']
    if vid:
        content = vid.content_type
        if int(size) < (10 * 1024 * 1024):
            try:
                filename = secure_filename(vid.filename)
                s3.Bucket(BUCKET_NAME).put_object(
                    Body=vid, Key=filename, ContentType=content, ACL='public-read')
                newVideo = Video(
                    content=f'https://bbscouting.s3.amazonaws.com/{filename}', content_type=content, player_id=id)
                db.session.add(newVideo)
                db.session.commit()
                return jsonify({'video_url':  f'https://bbscouting.s3.amazonaws.com/{filename}', 'type': content})
            except:
                return jsonify({'upload': False})
        else:
            try:
                filename = secure_filename(vid.filename)
                s3.Object(BUCKET_NAME, filename).upload_fileobj(vid, ExtraArgs={
                    'ContentType': content, 'ACL': 'public-read'}, Config=multi_config)
                newVideo = Video(
                    content=f'https://bbscouting.s3.amazonaws.com/{filename}', content_type=content, player_id=id)
                db.session.add(newVideo)
                db.session.commit()
                return jsonify({'video_url':  f'https://bbscouting.s3.amazonaws.com/{filename}', 'type': content})
            except:
                return jsonify({'upload': False})


@media_routes.route('/videos/<int:id>')
def get_videos(id):
    videos = Video.query.filter(
        Video.player_id == id).order_by(Video.id.desc()).all()
    try:
        return jsonify({'videos': [video.to_dict() for video in videos]})
    except:
        return jsonify({'videos': False})


@media_routes.route('/videos', methods=["DELETE"])
def delete_content():
    data = request.get_json()
    try:
        content_to_delete = Video.query.filter(Video.id == data['id']).first()
        db.session.delete(content_to_delete)
        db.session.commit()
        return jsonify({'removed': True})
    except:
        return jsonify({'removed': False})
