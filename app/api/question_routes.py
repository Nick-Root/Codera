from flask import Blueprint, jsonify, request
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from ..forms.question_form import QuestionForm

from flask_login import login_required, current_user
from datetime import date


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


@question_routes.route("", methods=["POST"])
@login_required
def post_question():

    form = QuestionForm()
    #form.topicId.choices = [(topic.id, topic.topic) for topic in Topic.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']

    # topicId2 = 0
    # for tup in form.topicId.choices:
    #     if tup[1] == form.topicId.data:
    #         topicId2 = tup[0]
    # print("topicId**********************************", topicId2)

    if form.validate_on_submit():
        new_question = Question (
            question = form.data["question"],
            ownerId = current_user.id,
            topicId = form.data["topicId"],
        )
        print("new_question", new_question)
        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"
