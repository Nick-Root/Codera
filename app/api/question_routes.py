from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from flask_login import login_required
from ..forms.comment_form import CommentForm


question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_questions():
    questions_list = Question.query.all()

    questions = []

    for question in questions_list:
        asker_username = User.query.get(question.ownerId).username

        question_data = question.to_dict()

        question_data["askerUsername"] = asker_username

        questions.append(question_data)


    return jsonify(questions)

@question_routes.route('/<int:id>')
def get_single_question(id):

    question = Question.query.get(id)

    asker_username = User.query.get(question.ownerId).username

    comments = Comment.query.filter_by(questionId=id).all()

    comment_data = [{
        "comment": comment.comment,
        "createdAt": comment.createdAt,
        "commentId": comment.id,
        "username": User.query.get(comment.userId).username
    } for comment in comments]

    question_data = question.to_dict()

    question_data["askerUsername"] = asker_username


    return jsonify(question_data, comment_data)


@question_routes.route('/current')
def get_curr_questions():
    userId = current_user.id

    user = User.query.get(userId)
    questions = Question.query.filter_by(ownerId=userId).all()

    user_data = user.to_dict()

    question_data = [question.to_dict() for question in questions]
    print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", question_data, user_data)
    return jsonify(user=user_data, questions=question_data)


@question_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
        userId=current_user.id,
        questionId=id,
        comment=form.data['comment']
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify(message='Comment created successfully')
