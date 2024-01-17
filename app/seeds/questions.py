from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
def seed_questions():
    question1 = Question(
        ownerId = 1, topicId = 1, question = 'How do I install different versions of python?',
        image="https://as1.ftcdn.net/v2/jpg/02/48/42/64/1000_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
    )
    question2 = Question(
        ownerId = 2, topicId = 2, question = 'How do I use a for loop in javascript?'
    )
    question3 = Question(
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
    question13 = Question(
        ownerId=5, topicId=3, question='Should I use Express over flask?'
    )
    question14 = Question(
    ownerId=4, topicId=1, question='What are the differences between Python 2 and Python 3?'
    )
    question15 = Question(
    ownerId=6, topicId=1, question='How can I handle exceptions in Python, and what is the purpose of try-except blocks?'
    )
    question16 = Question(
    ownerId=8, topicId=1, question='What are some best practices for writing clean and readable Python code?'
    )
    question17 = Question(
        ownerId=7, topicId=2, question='What are closures in JavaScript, and how can they be useful in coding?'
    )
    question18 = Question(
        ownerId=5, topicId=2, question='Explain the concept of hoisting in JavaScript and its implications.'
    )
    question19 = Question(
        ownerId=2, topicId=2, question='How does JavaScript handle asynchronous operations using callbacks?'
    )
    question20 = Question(
        ownerId=1, topicId=2, question='What are arrow functions in JavaScript, and how do they differ from regular functions?'
    )
    question21 = Question(
        ownerId=3, topicId=3, question='What is middleware in Express, and how is it used in building web applications?'
    )
    question22 = Question(
        ownerId=5, topicId=3, question='Explain the role of routers in Express and how to use them to organize routes.'
    )
    question23 = Question(
        ownerId=1, topicId=3, question='How can I handle form data in Express, especially when submitting it from a frontend?'
    )
    question24 = Question(
        ownerId=7, topicId=3, question='What is the purpose of the Express.static middleware, and how can it be configured?'
    )
    question25 = Question(
        ownerId=2, topicId=4, question='How can I perform a JOIN operation using Sequelize to fetch data from multiple tables?'
    )
    question26 = Question(
        ownerId=4, topicId=4, question='Explain the concept of migrations in Sequelize and how to use them for database schema changes.'
    )
    question27 = Question(
        ownerId=6, topicId=4, question='What are Sequelize hooks, and how can they be used in the lifecycle of database operations?'
    )
    question28 = Question(
        ownerId=8, topicId=4, question='How can I implement pagination in Sequelize to retrieve a subset of records from a large dataset?'
    )
    question37 = Question(
        ownerId=1, topicId=4, question='What are some common performance optimization techniques when working with Sequelize and large datasets in a Node.js application?'
    )
    question29 = Question(
        ownerId=3, topicId=5, question='What is the role of the meta tag in HTML, and how can it impact the display of web pages?'
    )
    question30 = Question(
        ownerId=6, topicId=5, question='How can I create a responsive design using HTML and CSS to ensure compatibility with various devices?'
    )
    question31 = Question(
        ownerId=8, topicId=5, question='What is the purpose of the HTML form element, and how can I handle form submissions with JavaScript?'
    )
    question32 = Question(
        ownerId=1, topicId=6, question='Explain the box model in CSS and how it influences the layout of elements on a webpage.'
    )
    question33 = Question(
        ownerId=3, topicId=6, question='What are CSS preprocessors, and how can they enhance the organization and maintenance of stylesheets?'
    )
    question34 = Question(
        ownerId=5, topicId=6, question='How can I implement a sticky navigation bar using CSS to improve website navigation?'
    )
    question35 = Question(
        ownerId=7, topicId=6, question='What are CSS Grid and Flexbox, and how do they compare in building responsive layouts?'
    )
    question36 = Question(
        ownerId=2, topicId=6, question='How can I use media queries in CSS to create a mobile-friendly design for my website?',
        image=""
    )


    db.session.add(question1)
    db.session.add(question2)
    db.session.add(question3)
    db.session.add(question4)
    db.session.add(question5)
    db.session.add(question6)
    db.session.add(question7)
    db.session.add(question8)
    db.session.add(question9)
    db.session.add(question10)
    db.session.add(question11)
    db.session.add(question12)
    db.session.add(question13)
    db.session.add(question14)
    db.session.add(question15)
    db.session.add(question16)
    db.session.add(question17)
    db.session.add(question18)
    db.session.add(question19)
    db.session.add(question20)
    db.session.add(question21)
    db.session.add(question22)
    db.session.add(question23)
    db.session.add(question24)
    db.session.add(question25)
    db.session.add(question26)
    db.session.add(question27)
    db.session.add(question28)
    db.session.add(question29)
    db.session.add(question30)
    db.session.add(question31)
    db.session.add(question32)
    db.session.add(question33)
    db.session.add(question34)
    db.session.add(question35)
    db.session.add(question36)
    db.session.add(question37)

    #now all questions are in the db
    #query for all questions
    all_questions = Question.query.all()
    #updates on every 5th question
    for i in range(0, len(all_questions), 5):
         #placeholder image for all questions
         if not all_questions[i].image: all_questions[i].image = "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    # print("pre commit seeding questions")
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
