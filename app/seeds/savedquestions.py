from app.models import db, SavedQuestion, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_savedquestions():
    useronesaved = SavedQuestion(
        questionId = 2, userId = 1, saved = True
    )
    usertwosaved = SavedQuestion(
        questionId = 3, userId = 2, saved = True
    )
    userthreesaved = SavedQuestion(
        questionId = 1, userId = 3, saved = True
    )

    db.session.add(useronesaved)
    db.session.add(usertwosaved)
    db.session.add(userthreesaved)

    db.session.commit()

def undo_savedquestions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.savedquestions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM savedquestions"))

    db.session.commit()
