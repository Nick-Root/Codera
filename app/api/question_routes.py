from flask import Blueprint
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic


question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_questions():
    questions = Question.query.all()


    print(questions)

    return questions

@question_routes.route('/<int:id>')
def get_single_question(id):
    question = Question.query.get(id)
    print(question)

    return question
