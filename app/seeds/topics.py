from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_topics():
    python = Topic(
        topic = 'Python'
    )
    javascript = Topic(
        topic = 'JavaScript'
    )
    express = Topic(
        topic = 'Express'
    )
    db.session.add(python)
    db.session.add(javascript)
    db.session.add(express)
    db.session.commit()

def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))

    db.session.commit()
