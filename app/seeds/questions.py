from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
def seed_questions():
    pythonques = Question(
        ownerId = 1, topicId = 1, question = 'How do I install different versions of python?'
    )
    javascriptques = Question(
        ownerId = 2, topicId = 2, question = 'How do I use a for loop in javascript?'
    )
    expressques = Question(
        ownerId = 2, topicId = 3, question = 'How do I write a route in express?'
    )
    db.session.add(pythonques)
    db.session.add(javascriptques)
    db.session.add(expressques)
    # print("pre commit seeding questions")
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
