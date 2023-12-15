from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    pythoncomm = Comment(
        userId = 2, questionId = 1, comment = 'Idk. Google it or something'
    )
    javascriptcomm = Comment(
        userId = 3, questionId = 2, comment = 'Idk. Check StackOverflow'
    )
    expresscomm = Comment(
        userId = 1, questionId = 3, comment = 'Idk. Scower the internet for it'
    )
    db.session.add(pythoncomm)
    db.session.add(javascriptcomm)
    db.session.add(expresscomm)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
