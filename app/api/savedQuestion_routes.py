from flask import Blueprint, jsonify
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from flask_login import login_required


savedQuestion_routes = Blueprint('savedQuestions', __name__)


@savedQuestion_routes.route('/')
# @login_required
def get_savedQuestions():
    savedQuestions = SavedQuestion.query.filter_by(saved = True).all()
    saved_data = []
    for saved in savedQuestions:
        data = saved.to_dict()
        questions = Question.query.filter_by(id = saved.questionId).all() 
        data['questions']=[question.to_dict() for question in questions] 
        saved_data.append(data)
    return saved_data


