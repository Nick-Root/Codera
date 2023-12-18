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
    comment4 = Comment(
        userId= 4, questionId=1 , comment = 'Great Question'
    )
    comment5 = Comment(
        userId= 5, questionId=2 , comment = 'Let me look into it'
    )
    comment6 = Comment(
        userId= 6, questionId=3 , comment = 'Look at the docs'
    )
    comment7 = Comment(
        userId= 7, questionId=4 , comment = 'You dont want everything always running at the same time'
    )
    comment8 = Comment(
        userId= 8, questionId=5 , comment = 'They are similar to JS arrays and dictionaries, I recommend looking at the the docs for in-depth explainations on each of them'
    )
    comment9 = Comment(
        userId= 1, questionId=6 , comment = ' "dbreset": "npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"'
    )
    comment10 = Comment(
        userId= 2, questionId=7 , comment = 'Definitely the <div> tag hands down'
    )
    comment11 = Comment(
        userId= 3, questionId=8 , comment = 'Adding a box-shadow property to you elements can really make your page pop!'
    )
    comment12 = Comment(
        userId= 4, questionId=9 , comment = 'You use this element to wrap sections of text for styling purposes or to add attributes to a section of text without creating a new line of content.'
    )
    comment13 = Comment(
        userId= 5, questionId=10 , comment = 'I personally love the .filter method. Look into it on MDN for more information'
    )
    comment14 = Comment(
        userId= 6, questionId=11 , comment = 'In my opinion Python is easier to understand. To each their own though.'
    )
    comment15 = Comment(
        userId= 7, questionId=12 , comment = 'I would checkout flexbox froggy!'
    )
    comment16 = Comment(
        userId= 8, questionId=1 , comment = 'I think you can `sudo apt install python 3.#`'
    )
    comment17 = Comment(
        userId= 1, questionId=2 , comment = 'For loops iterate over things like arrays or strings. You can then do something with the value of the iterable at whatever index. (array[i])'
    )
    comment18 = Comment(
        userId= 2, questionId=3 , comment = "Ask Anthony, he'll know"
    )
    comment19 = Comment(
        userId= 3, questionId=4 , comment = 'I have no clue!!'
    )
    comment20 = Comment(
        userId= 4, questionId=10 , comment = 'The .find method is pretty good. Lets you find something you specify anywhere within an array'
    )
    comment21 = Comment(
        userId= 5, questionId=6 , comment = 'What do you have so far?'
    )
    comment22 = Comment(
        userId= 6, questionId= 7, comment = "I'm a huge fan of the <li> and <ul> tags personally!!"
    )
    db.session.add(pythoncomm)
    db.session.add(javascriptcomm)
    db.session.add(expresscomm)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
