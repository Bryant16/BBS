from app.models import db, Player
from faker import Faker
import datetime
fake = Faker()
# Adds a demo user, you can add other users here if you want
def seed_players():
    for i in range(1,21):
        bday = fake.date_of_birth()
        birthday_formated = datetime.datetime.strptime(f'{bday}', '%Y-%m-%d').strftime('%m/%d/%y')
        db.session.add(Player(
            user_id=1,
            first_name=fake.first_name_male(),
            last_name=fake.last_name(),
            height=fake.random_choices(elements=("5'10","5'11","6'0","6'1","6'3"),length=1),
            weight=fake.random_choices(elements=('180','188','192','205','220','233','213'),length=1),
            position=fake.random_choices(elements=('1B','2B','3B','SS','RF','CF','LF','C','P'),length=1),
            address=fake.street_address(),
            phone_number= fake.phone_number(),
            email=fake.ascii_email(),
            team_name=fake.random_choices(elements=('Red Hawks','Padres','Red Sox','Black Sox','Blue Sox','Giants','Yankees'),length=1),
            team_city=fake.city(),
            team_state=fake.state(),
            dob=birthday_formated,
            bats=fake.random_choices(elements=('R','L','B'),length=1),
            throws=fake.random_choices(elements=('R','L'),length=1),
            hot_list=True,
        ))
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_players():
    db.session.execute('TRUNCATE players;')
    db.session.commit()