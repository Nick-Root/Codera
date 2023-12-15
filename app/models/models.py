from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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
            'username': self.username,
            'email': self.email
        }


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey('user.id'))
    question = db.Column(db.String, nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey('topic.id'))
    createdAt = db.Column(db.TIMESTAMP)
    updatedAt = db.Column(db.TIMESTAMP)

class SavedQuestion(db.Model):
    __tablename__ = 'savedquestions'
    id = db.Column(db.Integer, primary_key=True)
    questionId = db.Column(db.Integer, db.ForeignKey('question.id'))
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    saved = db.Column(db.Boolean, nullable=False, default=False)

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'))
    questionId = db.Column(db.Integer, db.ForeignKey('question.id'))
    comment = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.TIMESTAMP)
    updatedAt = db.Column(db.TIMESTAMP)

class Topic(db.Model):
    __tablename__ = 'topics'
    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String, nullable=False)
    questionId = db.Column(db.Integer, db.ForeignKey('question.id'))

# Define relationships
User.questions = db.relationship('Question', back_populates='owner')
Question.owner = db.relationship('User', back_populates='questions')
Question.saved_questions = db.relationship('SavedQuestion', back_populates='question')
SavedQuestion.question = db.relationship('Question', back_populates='saved_questions')
Question.comments = db.relationship('Comment', back_populates='question')
Comment.question = db.relationship('Question', back_populates='comments')
Question.topics = db.relationship('Topic', back_populates='question')
Topic.question = db.relationship('Question', back_populates='topics')
