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
        ownerId = 3, topicId = 3, question = 'How do I write a route in express?'
    )
    question4 = Question(
        ownerId = 1, topicId = 2, question = 'Why is it important to handle asynchronous operations in JavaScript? What are the common methods for managing asynchronous tasks, and how do Promises and async/await help in handling them effectively?'
    )
    question5 = Question(
        ownerId = 2, topicId = 1, question = "What exactly are Python's built-in data structures like lists, tuples, dictionaries, and sets? How and when should I use each one?"
    )
    question6 = Question(
        ownerId=4, topicId=4, question='Can someone comment a good sequelize script for resetting your database in an express backend?'
    )
    question7 = Question(
        ownerId=5, topicId=5, question='What is your favorite html tag?'
    )
    question8 = Question(
        ownerId=6, topicId=6, question='Anyone know any cool css tips or tricks?'
    )
    question9 = Question(
        ownerId=7, topicId=5, question='How does the span tag work in html?'
    )
    question10 = Question(
        ownerId=8, topicId=2, question='What are some good methods for extracting data from arrays without having to go through each iteration of an array?'
    )
    question11 = Question(
        ownerId=4, topicId=1, question='Are there any good advantages to using Python over JavaScript?'
    )
    question12 = Question(
        ownerId=3, topicId=5, question='Whats a good website to further my understanding of flex?'
    )


    db.session.add(pythonques)
    db.session.add(javascriptques)
    db.session.add(expressques)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)


    # print("pre commit seeding questions")
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
