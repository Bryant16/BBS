from app.models import db,Video
from faker import Faker
import random
fake = Faker()
# Adds a demo user, you can add other users here if you want

def seed_videos():
    aws_content = ["https://hips.hearstapps.com/hbz.h-cdn.co/assets/17/11/hbz-hot-mlb-noah-syndergaard-gettyimages-540950358.jpg",'https://bbscouting.s3.amazonaws.com/baseballplayer3.jpg','https://bbscouting.s3.amazonaws.com/bbscouting_logo.png','https://bbscouting.s3.amazonaws.com/IMG-2147.MP4','https://bbscouting.s3.amazonaws.com/IMG-3781.MP4','https://bbscouting.s3.amazonaws.com/IMG-3444.MP4',"https://media.nbclosangeles.com/2020/07/GettyImages-1225987681.jpg?resize=1200%2C675"]
    for i in range(1,15):
        content1 = Video(content=aws_content[0], content_type='image/jpeg',player_id=i)
        content2 = Video(content=aws_content[1], content_type='image/jpeg',player_id=i)
        content3 = Video(content=aws_content[2], content_type='image/jpeg',player_id=i)
        content4 = Video(content=aws_content[3], content_type='video/mp4',player_id=i)
        content5 = Video(content=aws_content[4], content_type='video/mp4',player_id=i)
        content6 = Video(content=aws_content[5], content_type='video/mp4',player_id=i)
        content7 = Video(content=aws_content[6], content_type='image/jpeg',player_id=i)
        shuf = [content1,content2,content3,content4,content5,content6, content7]
        random.shuffle(shuf)
        db.session.bulk_save_objects(shuf)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_videos():
    db.session.execute('TRUNCATE users;')
    db.session.commit()