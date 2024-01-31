import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetOneQuestion } from '../../redux/question.js';
import { thunkUpdateComment, getCurrentComments } from '../../redux/comment.js';
import './UpdateCommentModal.css'



const UpdateCommentModal = ({ comment }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const id = comment.commentId
    const [newCommentText, setUpdatedComment] = useState(comment.comment);
    const [errors, setErrors] = useState({});
    const questionData = useSelector((state) => state.question.oneQuestion || [])


    const { 0: question } = questionData
    let questionPageId

    if (question) {
        questionPageId = question.id
    } else {
        questionPageId = comment.questionId
    }

    // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", comment);
    // console.log("%c   LOOK HERE", "color: purple; font-size: 18px", question);
    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", questionPageId);

    //error handling
    useEffect(() => {
        const errors = {};
        if (newCommentText.length === 255)
        errors.newCommentText = "Maximum comment length is 255 characters.";
        setErrors(errors);
    }, [newCommentText])

    const handleSubmit = async (e) => {
        e.preventDefault();



        const response = await dispatch(thunkUpdateComment(id, newCommentText));



        await dispatch(thunkGetOneQuestion(questionPageId))
            .then(closeModal)



        await dispatch(getCurrentComments())
            .then(closeModal)

    }

    //code to automatically adjust the height
    function adjustTextareaHeight() {
        const textarea = document.getElementById('updatedComment');
        //expands the textarea height dynmically
        textarea.style.height = 'auto';
        //sets the height including the unseen part of the textarea
        textarea.style.height = (textarea.scrollHeight) + 'px';
    }
    //we use useeffect to check the height everytime the newCommentText state changes
    useEffect(() => {
        adjustTextareaHeight();
    }, [newCommentText]);

    return (
        <div className="update-comment-modal">
            <div className="modal-header">
                <h3>Edit Your Comment</h3>
            </div>
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* same as other forms */}
                        <div className="input-container">
                        <textarea
                            id="updatedComment"
                            type='text'
                            name="updatedComment"
                            value={newCommentText}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                            maxLength={255}
                            rows='1'

                        />
                        </div>
                        <div className='error'>
                        {errors.newCommentText && `${errors.newCommentText}`}
                        </div>

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
