from flask import Blueprint, jsonify
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic


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