from .db import db


class Video(db.Model):
    __tablename__ = "videos"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    content_type = db.Column(db.String)
    x = db.Column(db.String)
    y = db.Column(db.String)
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    player = db.relationship("Player")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "type": self.content_type,
            "x": self.x,
            "y": self.y,
        }
