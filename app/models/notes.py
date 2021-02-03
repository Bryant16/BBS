from .db import db

class Note(db.Model):
    __tablename__ = 'notes'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    text = db.Column(db.Text, nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
    players = db.relationship("Player", back_populates="notes")

    def to_dict(self):
        return {
            "title": self.title,
            "text": self.text
        }