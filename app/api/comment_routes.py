from flask import Blueprint, jsonify, request
from flask_login import login_required
from flask_login import current_user
from ..models import db
from ..models.models import Question, SavedQuestion, User, Comment, Topic
from ..forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/current')
@login_required
def get_curr_comments():
    userId = current_user.id

    user = User.query.get(userId)
    comments = Comment.query.filter_by(userId= userId).all()

    user_data = user.to_dict()
    comment_data = [comment.to_dict() for comment in comments]
    return jsonify(user=user_data, comments=comment_data)

@comment_routes.route('/<int:commentId>/remove', methods=['DELETE'])
@login_required
def delete_comment(commentId):

        comment = Comment.query.get(commentId)


        if comment.userId != current_user.id:
            return jsonify(message="You are not authorized to delete this comment"), 403

        db.session.delete(comment)
        db.session.commit()

        return jsonify(message="Comment deleted successfully"), 200

@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def update_comment(commentId):
    comment = Comment.query.get(commentId)

    if current_user.id != comment.userId:
        return jsonify({"error": "You are not authorized to update this comment"}), 403

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.comment = form.data['comment']
        db.session.commit()
        return jsonify({"message": "Comment updated successfully", "comment": comment.to_dict()})
    else:
        errors = form.errors
        return jsonify({"error": errors}), 400
