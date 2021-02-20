from .db import db
from .images import Image
from .pitcher_evaluations import Pitcher_Evaluation
from .non_pitcher_evaluations import Non_Pitcher_Evaluation


class Player(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    height = db.Column(db.String)
    weight = db.Column(db.String)
    position = db.Column(db.String)
    address = db.Column(db.String)
    phone_number = db.Column(db.String)
    email = db.Column(db.String)
    team_name = db.Column(db.String)
    team_city = db.Column(db.String)
    team_state = db.Column(db.String)
    bats = db.Column(db.String)
    throws = db.Column(db.String)
    dob = db.Column(db.String)
    hot_list = db.Column(db.Boolean, create_constraint=True)
    notes = db.relationship("Note", back_populates="players")
    photos = db.relationship("Image", back_populates="players")
    pitchers = db.relationship("Pitcher_Evaluation", back_populates="players")
    non_pitchers = db.relationship(
        "Non_Pitcher_Evaluation", back_populates="players")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "height": self.height,
            "weight": self.weight,
            "position": self.position,
            "address": self.address,
            "phone_number": self.phone_number,
            "email": self.email,
            "team_name": self.team_name,
            "team_city": self.team_city,
            "team_state": self.team_state,
            "bats": self.bats,
            "throws": self.throws,
            "hot_list": self.hot_list,
            "dob": self.dob
        }
    def get_non_pitcher(self):
      return {
          "non_pitcher_evaluations": [evals.to_dict() for evals in self.non_pitchers],   
      }
    
    def get_pitcher(self):
        return {
            "pitcher_evaluations": [evals.to_dict() for evals in self.pitchers]
        }
    def get_profile_pic(self):
        return {
            "profile_url":[image.to_dict() for image in self.photos]
        }
