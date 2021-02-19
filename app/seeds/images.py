from app.models import db,Image
from faker import Faker
fake = Faker()
# Adds a demo user, you can add other users here if you want

def seed_images():
    player1 = Image(URL='https://media.npr.org/assets/img/2020/04/05/simon_gettyimages-1177643064-cc4ce9e08e0e4b57bda44d4e2161943dc0ca22da-s800-c85.jpg', player_id=1)
    player2 = Image(URL='https://wtop.com/wp-content/uploads/2017/05/Mariners_Nationals_Baseball_77128-1824x1254.jpg', player_id=2)
    player3 = Image(URL='https://cdn.bleacherreport.net/images_root/slides/photos/000/460/550/103621560_original.jpg?1287792269', player_id=3)
    player4 = Image(URL='https://cdn.vox-cdn.com/thumbor/-UbZgtLewHyauissBxMo_mfr3gE=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/11917131/usa_today_10987937.jpg', player_id=4)
    player5 = Image(URL='https://cdn.theathletic.com/app/uploads/2020/07/22231638/D357CCC7-EC26-441A-A784-655272BC36E6-1024x683.jpeg', player_id=5)
    player6 = Image(URL='https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iheFIbq0YQVU/v0/1000x-1.jpg', player_id=6)
    player7 = Image(URL='https://www.al.com/resizer/G_jjafvx5edLoB2nUejREoKi8L0=/1280x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/UGWWZWX67FD75CV4J57O5K7IIY.jpg', player_id=7)
    player8 = Image(URL='https://i.insider.com/5c9b7a3c8e436a06ad1b403d?width=700', player_id=8)
    player9 = Image(URL='https://media1.popsugar-assets.com/files/thumbor/28vNM9K5dj_AMy6naTwQa2VlJQY/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/04/09/671/n/1922729/6c28c62f5acb81949edb33.04400722_/i/Hottest-Baseball-Players-2018.jpg', player_id=9)
    player10 = Image(URL='https://images.saymedia-content.com/.image/t_share/MTc0NTEwNDQ2NjgwNzQ1OTI5/25-greatest-players-in-major-league-baseball-history.jpg', player_id=10)
    player11 = Image(URL='https://www.gannett-cdn.com/presto/2019/08/03/USAT/decd1162-00ed-47f6-b599-867b600f7aa4-USATSI_13143985.jpg', player_id=11)
    player12 = Image(URL='https://www.ocregister.com/wp-content/uploads/2019/08/GettyImages-1161081211-1.jpg', player_id=12)
    player13 = Image(URL='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouRKWTPOPh85dNhZsHFJSMYjJvoqP5l0hpg&usqp=CAU', player_id=13)
    player14 = Image(URL='https://fivethirtyeight.com/wp-content/uploads/2020/06/GettyImages-926733566-1-e1591292233895.jpg?w=721', player_id=14)
    player15 = Image(URL='https://bloximages.newyork1.vip.townnews.com/elpasoinc.com/content/tncms/assets/v3/editorial/a/06/a065557a-36bd-11e9-91b3-0b738ce4ee24/5c702169551a3.image.jpg?resize=1200%2C1179', player_id=15)
    db.session.bulk_save_objects([player1,player2,player3,player4,player5,player6,player7,player8,player9,player10,player11,player12,player13,player14,player15])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_images():
    db.session.execute('TRUNCATE users;')
    db.session.commit()