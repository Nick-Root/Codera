from flask import Blueprint, jsonify
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from flask_login import login_required, current_user



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



@savedQuestion_routes.route('<int:id>', methods=['POST'])
def add_savedquestion(id):
    savedQuestion = SavedQuestion.query.filter_by(userId=current_user.id, questionId=id).first()

    if not savedQuestion:
        add_savedQuestion = SavedQuestion(
            userId=current_user.id,
            questionId=id,
            saved=True
        )
        db.session.add(add_savedQuestion)
        db.session.commit()
        return jsonify(message='Question saved successfully')
    return jsonify(message='Question already saved')
    


@savedQuestion_routes.route('<int:id>/remove', methods=['DELETE'])
def remove_savedQuestion(id):
    savedQuestion = SavedQuestion.query.filter_by(questionId = id).first()
    
    if savedQuestion:
        db.session.delete(savedQuestion)
        db.session.commit()
        return jsonify({'message': 'Saved question removed successfully'})

    return jsonify({'message': 'Saved question not found'})
