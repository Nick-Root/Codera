from app.models import db, User, Question, SavedQuestion, Comment, Topic
from app import app
#from app.forms.question_form import QuestionForm


#allows for a built in try catch block
#connects to the app
with app.app_context():
    # do not do this with alembic
    # db.drop_all()
    # print("all tables detroyed")
    # db.create_all()
    # print("created all tables")

    # pipenv run flask seed undo
    # pipenv run flask seed all

    # print("*****************")
    # print("TOPIC", Topic.query.all())
    # print([topic.to_dict() for topic in Topic.query.all()])
    # print([topic.topic for topic in Topic.query.all()])
    # print([topic.id for topic in Topic.query.all()])
    # print([(topic.id, topic.topic) for topic in Topic.query.all()])

    # form = QuestionForm()
    # print("form.topic.data", form.topic.data)
