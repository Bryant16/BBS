from .db import db

class Pitcher_Evaluation(db.Model):
    __tablename__= 'pitcher_evaluations'
    id = db.Column(db.Integer, primary_key = True)
    fast_ball = db.Column(db.Integer, nullable=False)
    curve = db.Column(db.Integer, nullable=False)
    control = db.Column(db.Integer, nullable=False)
    change_of_pace = db.Column(db.Integer, nullable=False)
    slider = db.Column(db.Integer, nullable=False)
    knuckle_ball = db.Column(db.Integer, nullable=False)
    other = db.Column(db.Integer, nullable=False)
    poise = db.Column(db.Integer, nullable=False)
    baseball_instinct = db.Column(db.Integer, nullable=False)
    aggresiveness = db.Column(db.Integer, nullable=False)
    arm_action = db.Column(db.String)
    delivery = db.Column(db.String)
    player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
    players = db.relationship("Player", back_populates="pitchers")

    def to_dict(self):
        return {
            "fast_ball": self.fast_ball,
            "curve": self.curve,
            "control": self.control,
            "change_of_pace": self.change_of_pace,
            "slider": self.slider,
            "knuckle_ball": self.knuckle_ball,
            "other": self.other,
            "poise": self.poise,
            "baseball_instinct": self.baseball_instinct,
            "aggresiveness": self.aggresiveness,
            "arm_action": self.arm_action,
            "delivery": self.delivery,
            
        }