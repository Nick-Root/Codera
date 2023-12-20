import { useDispatch } from 'react-redux';
import { getCurrentComments, thunkDeleteComment, } from '../../redux/comment';
import { useModal } from "../../context/Modal";
import { thunkGetOneQuestion } from '../../redux/question';
import { useParams } from 'react-router-dom';
import './DeleteCommentModal.css'

const DeleteCommentModal = ({ comment }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log("%c   LOOK HERE", "color: green; font-size: 18px", comment);

    const deleteComment = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteComment(comment.commentId))
        if (id) {
            await dispatch(thunkGetOneQuestion(id))
                .then(closeModal)
        } else {
            await dispatch(getCurrentComments())
                .then(closeModal)
        }
    }


    return (
        <>
            <div id='delete_comment_container' className="login_container">
                <h2 className='delcomm'>Delete comment?</h2>
                <div className='commconfirm'>Are you sure you want to delete this comment?</div>
                <div className='modal-buttons'>
                    <button onClick={deleteComment}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteCommentModal
