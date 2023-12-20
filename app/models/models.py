from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email
        }


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id'))
    question = db.Column(db.String(255), nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey('topics.id'))
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    topic = db.relationship('Topic', primaryjoin="Question.topicId == Topic.id", back_populates='questions', overlaps='topic')

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'question': self.question,
            'topicId': self.topicId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

class SavedQuestion(db.Model):
    __tablename__ = 'savedquestions'
    id = db.Column(db.Integer, primary_key=True)
    questionId = db.Column(db.Integer, db.ForeignKey('questions.id'))
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    saved = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'questionId': self.questionId,
            'userId': self.userId,
            'saved': self.saved
        }


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    questionId = db.Column(db.Integer, db.ForeignKey('questions.id'))
    comment = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'questionId': self.questionId,
            'comment': self.comment,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

class Topic(db.Model):
    __tablename__ = 'topics'
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(20), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey('users.id', name='topic_owner'))

    owner = db.relationship('User', back_populates='topics')

    questions = db.relationship('Question', primaryjoin="Topic.id == Question.topicId", back_populates='topic', overlaps='questions')

    def to_dict(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'ownerId': self.ownerId
        }



# Define relationships
User.questions = db.relationship('Question', back_populates='owner')
User.topics = db.relationship('Topic', back_populates='owner', overlaps='owner_topics')
Question.owner = db.relationship('User', back_populates='questions')
Question.saved_questions = db.relationship('SavedQuestion', back_populates='question')
SavedQuestion.question = db.relationship('Question', back_populates='saved_questions')
Question.comments = db.relationship('Comment', back_populates='question')
Comment.question = db.relationship('Question', back_populates='comments')
Question.topics = db.relationship('Topic', back_populates='question')
Topic.question = db.relationship('Question', back_populates='topics')
