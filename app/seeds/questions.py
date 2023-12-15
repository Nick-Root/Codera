from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
def seed_questions():
    python = Question(
        ownerId = 1, question = 'How do I install different versions of python?', createdAt = datetime.now(), updatedAt = datetime.now()
    )
    javascript = Question(
        ownerId = 2, question = 'How do I use a for loop in javascript?', createdAt = datetime.now(), updatedAt = datetime.now()
    )
    express = Question(
        ownerId = 2, question = 'How do I write a route in express?', createdAt = datetime.now(), updatedAt = datetime.now()
    )
    db.session.add(python)
    db.session.add(javascript)
    db.session.add(express)
    print("pre commit seeding questions")
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
