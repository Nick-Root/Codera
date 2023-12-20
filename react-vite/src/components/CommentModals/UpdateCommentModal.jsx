import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetOneQuestion } from '../../redux/question.js';
import { thunkUpdateComment, getCurrentComments } from '../../redux/comment.js';
import './UpdateCommentModal.css'



const UpdateCommentModal = ({ comment }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const id = comment.commentId
    const [newCommentText, setUpdatedComment] = useState(comment.comment);

    const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const questionArray = Object.values(questionData)
    // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionData);
    const { 0: question } = questionData
    const questionId = question?.id

    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionId);
    const handleSubmit = async (e) => {
        e.preventDefault();



        const response = await dispatch(thunkUpdateComment(id, newCommentText));



        await dispatch(thunkGetOneQuestion(questionId))
            .then(closeModal)

        await dispatch(getCurrentComments())
            .then(closeModal)

    }

    return (
        <div className="update-comment-modal">
            <div className="modal-header">
                <h3>Edit Your Comment</h3>
            </div>
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            id="updatedComment"
                            type='text'
                            name="updatedComment"
                            placeholder=''
                            value={newCommentText}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                        {/* <label htmlFor="updatedComment">Updated Comment</label> */}

                    </div>
                    <div className="form-group">
                        <button type="submit" className='savechange'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateCommentModal;
