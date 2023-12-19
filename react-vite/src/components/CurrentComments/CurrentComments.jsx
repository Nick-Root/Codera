import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentComments } from "../../redux/comment"
import './CurrentComments.css'


const CurrentComments = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentComments())
    }, [dispatch])


    const comments = useSelector((state) => state.comment.userComments)
    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", comments);

    const user = useSelector((state) => state.comment.user)

    console.log("Curr user questions", comments)
    console.log("Curr user question user", user)

    if (!comments) return null

    if (!user) return null

    return (
        <div className="container">
            <div className="container_text">Your Comments</div>
            {comments.map((comment) => (
                <div key={comment.commentId} className="one_question_container" >
                    <div>{comment.comment}</div>
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
                    </div>
                </div>
            ))}
        </div>

    );

}

export default CurrentComments
