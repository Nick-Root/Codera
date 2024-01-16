import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentComments } from "../../redux/comment"
import DeleteCommentModal from "../CommentModals/DeleteCommentModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateCommentModal from "../CommentModals/UpdateCommentModal";
import { NavLink } from "react-router-dom";
import './CurrentComments.css'
import { useNavigate } from "react-router-dom";


const CurrentComments = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentComments())
    }, [dispatch])


    const comments = useSelector((state) => state.comment.userComments)

    const user = useSelector((state) => state.comment.user)

    let sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
        navigate('/')
    }

    // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", comments);

    // const isCommentOwner = comment.user.Id === user.id;

    if (!comments) return null

    if (!user) return null

    return (
        <div className="container">
            <div className="container_text">Your Comments</div>
            {comments.map((comment) => (
                <div
                    key={comment.commentId}

                    className="one_question_container"
                >
                    <NavLink to={`/questions/${comment.questionId}`} className='navtopage'>{comment.comment}</NavLink>
                    <div className="user_comments">
                        <p className="userName">{user.username}</p>
                        <p className="created-date">
                            Commented on:{" "}
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <div className="edit_delete_comment">
                            <div className="update_comment">

                                <i className="fa-solid fa-pen-to-square"></i>
                                <OpenModalMenuItem
                                    itemText='Update'
                                    modalComponent={<UpdateCommentModal comment={comment} />}
                                />
                            </div>
                            <div className="delete_comment">
                                <i className="fa-solid fa-trash-can"></i>
                                <OpenModalMenuItem
                                    itemText='Delete'
                                    modalComponent={<DeleteCommentModal comment={comment} />}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            )).reverse()}
        </div>

    );

}

export default CurrentComments
