from flask import Blueprint, jsonify
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from flask_login import login_required


savedQuestion_routes = Blueprint('savedQuestions', __name__)


@savedQuestion_routes.route('/')
# @login_required
def get_savedQuestions():
    savedQuestions = SavedQuestion.query.filter_by(saved = True).all()
    topic_data = []
    for topic in savedQuestions:
        data = topic.to_dict()
        questions = Question.query.filter_by(id = topic.questionId).all() 
        data['questions']=[question.to_dict() for question in questions] 
        topic_data.append(data)
    return topic_data