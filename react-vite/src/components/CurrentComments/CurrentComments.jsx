import { useEffect, useState } from "react"
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
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await dispatch(getCurrentComments());
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

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

    if (isLoading === true) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="container_text">Your Comments</div>

            {!isLoading && comments.length === 0 ? (
                // Displaying the no-comments message
                <div className='no-comments-container'>
                    <p>Looks like you have no saved questions. Explore the community to find something that interests you.</p>
                    <button onClick={() => navigate('/questions')}>Explore Questions</button>
                </div>
            ) : (
                comments.map((comment) => (
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
                                    <OpenModalMenuItem
                                        itemText={(<><i className="fa-solid fa-pen-to-square"></i> Update</>)}
                                        modalComponent={<UpdateCommentModal comment={comment} />}
                                    />
                                </div>
                                <div className="delete_comment">
                                    <OpenModalMenuItem
                                        itemText={<><i className="fa-solid fa-trash-can"></i> Delete</>}
                                        modalComponent={<DeleteCommentModal comment={comment} />}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                )).reverse())}
        </div>
    );


}

export default CurrentComments
