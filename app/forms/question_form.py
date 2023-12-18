from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
    question = StringField("Question", validators=[DataRequired()])
    topic = StringField("Topic",  validators=[DataRequired()])
