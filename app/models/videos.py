from .db import db


class Video(db.Model):
    __tablename__ = "videos"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    player = db.relationship("Player")

    def to_dict(self):
        return {
            "content": self.content
        }
