from .db import db

class Image(db.Model):
  __tablename__ = "images"
  id = db.Column(db.Integer, primary_key=True)
  URL = db.Column(db.String, nullable=False)
  x = db.Column(db.String)
  y = db.Column(db.String)
  player_id = db.Column(db.Integer, db.ForeignKey("players.id"))
  players = db.relationship("Player", back_populates="photos")
  

  def to_dict(self):
    return {
      "URL": self.URL,
      'x': self.x,
      'y': self.y,
    }
 
