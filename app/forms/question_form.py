from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired
from ..models.models import Topic

#aws s3
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from ..api.aws_helpers import ALLOWED_EXTENSIONS  #changed directory


class QuestionForm(FlaskForm):
    question = StringField("Question", validators=[DataRequired()])
    #for post/edit image
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    topicId = IntegerField("TopicId", validators=[DataRequired()])
