import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  aws_access_key_id=os.environ.get("aws_access_key_id")
  aws_secret_access_key=os.environ.get("aws_secret_access_key")
