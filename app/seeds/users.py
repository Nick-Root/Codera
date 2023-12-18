from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', firstname='Demo', lastname='User', email='demo@aa.io', password='password')
    marnie = User(username='marnie', firstname='M-Dog', lastname='mLast', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', firstname='Bob', lastname='bie', email='bobbie@aa.io', password='password')
    botone = User(username='botone', firstname='bot', lastname='one', email='botone@gmail.com', password='botonepass')
    bottwo = User(username='bottwo', firstname='bot', lastname='two', email='bottwo@gmail.com', password='bottwopass')
    botthree = User(username='botthree', firstname='bot', lastname='three', email='botthree@gmail.com', password='botthreepass')
    botfour = User(username='botfour', firstname='bot', lastname='four', email='botfour@gmail.com', password='botfourpass')
    botfive = User(username='botfive', firstname='bot', lastname='five', email='botfive@gmail.com', password='botfivepass')

    db.session.add(botone)
    db.session.add(bottwo)
    db.session.add(botthree)
    db.session.add(botfour)
    db.session.add(botfive)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()
# primaryjoin="Question.topicId == Topic.id"
# primaryjoin="Topic.id == Question.topicId"
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
