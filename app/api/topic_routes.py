from flask import Blueprint, jsonify, request, redirect
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from ..forms.topic_form import TopicForm
from flask_login import login_required, current_user
topic_routes = Blueprint('topics', __name__)


@topic_routes.route('/')
def get_topics():
    topics = Topic.query.all()

    topic_data = []
    for topic in topics:
        data = topic.to_dict()
        questions = Question.query.filter_by(topicId = topic.id).all() #get questions by topicId
        data['questions']=[question.to_dict() for question in questions] #add questions key to Topic
        topic_data.append(data)

    return topic_data


@topic_routes.route('/<int:id>')
def get_single_topic(id):
    topic = Topic.query.get(id)

    topic_data = []
    data = topic.to_dict()
    questions = Question.query.filter_by(topicId = topic.id).all()
    data['questions']=[question.to_dict() for question in questions]
    topic_data.append(data)

    return topic_data

@topic_routes.route('/new', methods=['POST'])
@login_required
def new_topic():
    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        topic = Topic(topic=form.data['topic'], ownerId = current_user.id)
        db.session.add(topic)
        db.session.commit()
    return


@topic_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_topic(id):
    topic = Topic.query.get(id)

    if current_user.id != topic.ownerId:
        return jsonify({"error": "You are not authorized to update this topic"}), 403

    form = TopicForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        topic.topic = form.data['topic']
        db.session.commit()
        return jsonify({"message": "Topic updated successfully"})
    else:
        errors = form.errors
        return jsonify({"error": errors}), 400
