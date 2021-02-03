from .db import db

class Non_Pitcher_Evaluation(db.Model):
    __tablename__= 'non_pitcher_evaluations'
    id = db.Column(db.Integer, primary_key = True)
    hitting_ability = db.Column(db.Integer, nullable=False)
    power = db.Column(db.Integer, nullable=False)
    running_speed = db.Column(db.Integer, nullable=False)
    baserunning = db.Column(db.Integer, nullable=False)
    arm_str = db.Column(db.Integer, nullable=False)
    arm_acc = db.Column(db.Integer, nullable=False)
    fielding = db.Column(db.Integer, nullable=False)
    arm_range = db.Column(db.Integer, nullable=False)
    baseball_instinct = db.Column(db.Integer, nullable=False)
    aggresiveness = db.Column(db.Integer, nullable=False)
    pull = db.Column(db.String)
    str_away = db.Column(db.String)
    opp_field = db.Column(db.String)
    player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
    players = db.relationship("Player", back_populates='non_pitchers')

    def to_dict(self):
        return {
            "hitting_ability": self.hitting_ability,
            "power": self.power,
            "running_speed": self.running_speed,
            "baserunning": self.baserunning,
            "arm_str": self.arm_str,
            "arm_acc": self.arm_acc,
            "fielding": self.fielding,
            "arm_range": self.arm_range,
            "baseball_instinct": self.baseball_instinct,
            "aggresiveness": self.aggresiveness,
            "pull": self.pull,
            "str_away": self.str_away,
            "opp_field": self.opp_field
        }