from flask import Blueprint, jsonify
from flask_login import current_user
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic


question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_questions():
    questions = Question.query.all()


    questions = [question.to_dict() for question in questions]
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",questions)

    return jsonify(questions)

@question_routes.route('/<int:id>')
def get_single_question(id):

    question = Question.query.get(id)

    user = User.query.get(question.ownerId)

    question_data = question.to_dict()
    user_data = user.to_dict()


    return jsonify(question_data, user_data)


@question_routes.route('/current')
def get_curr_questions():
    userId = current_user.id

    user = User.query.get(userId)
    questions = Question.query.filter_by(ownerId=userId).all()

    user_data = user.to_dict()
    question_data = [question.to_dict() for question in questions]
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", question_data, user_data)
    return jsonify(user=user_data, questions=question_data)
