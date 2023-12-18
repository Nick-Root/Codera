from flask_wtf import FlaskForm
from wtforms import StringField
from app.models import Topic
from wtforms.validators import DataRequired, ValidationError

def topic_exists(form, field):
    topic = form.data
    exists = Topic.query.filter(Topic.topic == topic).first()
    if exists:
        raise ValidationError('Topic already exists')

class TopicForm(FlaskForm):
    topic = StringField("topic", validators=[DataRequired()])
