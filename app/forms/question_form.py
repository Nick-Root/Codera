from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from ..models.models import Topic


class QuestionForm(FlaskForm):
    question = StringField("Question", validators=[DataRequired()])
    topicId = IntegerField("TopicId", validators=[DataRequired()])
