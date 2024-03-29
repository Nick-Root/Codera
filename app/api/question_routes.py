from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from ..forms.question_form import QuestionForm
from ..forms.comment_form import CommentForm

from flask_login import login_required, current_user
from datetime import datetime

#aws s3, directly from recording
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename


question_routes = Blueprint('questions', __name__)

@question_routes.route('/')
def get_questions():
    questions_list = Question.query.order_by(Question.id.desc()).all()

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

    saved = SavedQuestion.query.filter_by(questionId = question.id).all()

    comment_data = [{
        "comment": comment.comment,
        "createdAt": comment.createdAt,
        "commentId": comment.id,
        "username": User.query.get(comment.userId).username,
        "ownerId": comment.userId,
        'saved': [s.saved for s in saved]
    } for comment in comments]

    question_data = question.to_dict()

    question_data["askerUsername"] = asker_username
    question_data['saved'] = [s.to_dict() for s in saved]


    return jsonify(question_data, comment_data)


@question_routes.route('/current')
def get_curr_questions():
    userId = current_user.id

    user = User.query.get(userId)
    questions = Question.query.filter_by(ownerId=userId).all()

    user_data = user.to_dict()

    question_data = [question.to_dict() for question in questions]
    print("question_data and user_data", question_data, user_data)
    return jsonify(user=user_data, questions=question_data)


@question_routes.route("", methods=["POST"])
@login_required
def post_question():

    form = QuestionForm()
    #form.topicId.choices = [(topic.id, topic.topic) for topic in Topic.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']


    #aws s3
    image = form.data["image"]
    #using list did not work, so used object instead
    upload = {}
    #added contidional
    if image is not None:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print("upload", upload)

    # commented out because upload is an obj now
    # if "url" not in upload:
    # # if the dictionary doesn't have a url key
    # # it means that there was an error when you tried to upload
    # # so you send back that error message (and you printed it above)
    #     return { "error": "url not in upload" }

    if form.validate_on_submit():
        new_question = Question (
            question = form.data["question"],
            #dictionary.get(), if url is not in upload dictionary, it returns None
            image=upload.get('url'),
            ownerId = current_user.id,
            topicId = form.data["topicId"],
            createdAt = datetime.now(),
            updatedAt = datetime.now()
        )
        print("new_question", new_question)
        db.session.add(new_question)
        db.session.commit()
        return new_question.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"


@question_routes.route("<int:id>", methods=["PUT"])
@login_required
def update_question(id):
    question = Question.query.get(id)
    print("question", question)

    if not question:
        return "Question does not exist"

    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    #aws s3
    #same as post
    image = form.data["image"]
    #using list did not work, so used object instead
    upload = {}
    #added contidional
    if image is not None:
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print("upload", upload)

    # if "url" not in upload:
    # # if the dictionary doesn't have a url key
    # # it means that there was an error when you tried to upload
    # # so you send back that error message (and you printed it above)
    #     return { "error": "url not in upload" }

    if form.validate_on_submit():
        question.question = form.data["question"]
        question.image=upload.get('url')  #no comma here
        question.ownerId = current_user.id
        question.topicId = form.data["topicId"]
        question.updatedAt = datetime.now()

        db.session.commit()
        print("question.to_dict()", question.to_dict())
        return question.to_dict()
    else:
        print("Bad Data")
        return "Bad Data"


@question_routes.route('<int:id>', methods=['DELETE'])
def remove_question(id):
    question = Question.query.get(id)
    Comment.query.filter_by(questionId=id).delete()
    if question:
        db.session.delete(question)
        db.session.commit()
        return jsonify({'message': 'Question removed successfully'})
    else:
        print("Question does not exist")

    return jsonify({'message': 'Question not found'})




@question_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(comment=form.data['comment'],
        userId=current_user.id,
        questionId= id
        )
        db.session.add(comment)
        db.session.commit()
    return
