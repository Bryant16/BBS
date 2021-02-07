from .db import db

class Image(db.Model):
  __tablename__ = "images"
  id = db.Column(db.Integer, primary_key=True)
  URL = db.Column(db.String, nullable=False)
  player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
  players = db.relationship("Player", back_populates="photos")

  def to_dict(self):
    return {
      "URL": self.URL[len(self.url)-1]
    }
 
