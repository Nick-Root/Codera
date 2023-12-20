import './QuestionDetails.css';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion, thunkFetchAddSavedQuestion } from '../../redux/question'
import { thunkPostComment } from '../../redux/comment';
import DeleteCommentModal from "../CommentModals/DeleteCommentModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useParams } from "react-router-dom";
import './QuestionDetails.css'
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal"
import UpdateCommentModal from '../CommentModals/UpdateCommentModal';



const QuestionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const questionArray = Object.values(questionData)
    // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionData);
    const { 0: question, 1: comments } = questionData
    const user = useSelector((state) => state.session.user)
    // console.log("%c   LOOK HERE", "color: green; font-size: 18px", user);

    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        const commentData = {
            comment: commentText,
        };


        await dispatch(thunkPostComment(id, commentData))
        await dispatch(thunkGetOneQuestion(id))

        setCommentText('')
    };

    //logic for Modal
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(thunkGetOneQuestion(id))
    }, [dispatch, id])

    if (!question) {
        return null
    }
    const saved = () => {
        dispatch(thunkFetchAddSavedQuestion(question.question, question.id))
    }
    console.log(question)
    return (
        <div className='container'>
            <div className="container_text">
                <div>{question.question}</div>
                <div className='bottom_text'>
                    <div className="user_question">
                        <p className='userName'>{question.askerUsername}</p>
                        <p className='created-date'>
                            Asked:{" "}
                            {new Date(question.createdAt).toLocaleDateString(undefined, {
                                day: 'numeric',
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                {/* edit question button/modal */}
                {user && user.id === question.ownerId && (
                    <div className="edit_question">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <OpenModalMenuItem
                            itemText='Edit'
                            onItemClick={closeMenu}
                            className='updatequestionmodal'
                            modalComponent={<UpdateQuestionModal id={parseInt(id)} />}
                            />
                    </div>
                )}
                {user && (
                    <button onClick={saved} className='save_button'>save</button>
                )}
                </div>
            </div>
            <div className="comments">
                <h3>Comments:</h3>
                <div className='create-comment'>
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Enter your comment"
                    />
                    <button onClick={handleCommentSubmit}>Submit Comment</button>
                </div>
                {comments.map((comment) => (
                    <div key={comment.commentId} className="comment">
                        <div className='comments'>
                            <p>{comment.comment}</p>
                            <div className='user_question'>
                                <p >
                                    Commented by: {comment.username}{" "} on {' '}
                                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                        day: 'numeric',
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                                <div className="edit_delete_comment">
                                    <div className="update_comment">
                                        {user && user.id === comment.ownerId && (
                                            <>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                <OpenModalMenuItem
                                                    itemText='Update'
                                                    modalComponent={<UpdateCommentModal comment={comment} />}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="delete_comment">
                                        {user && user.id === comment.ownerId && (
                                            <>
                                                <i className="fa-solid fa-trash-can"></i>
                                                <OpenModalMenuItem
                                                    itemText='Delete'
                                                    modalComponent={<DeleteCommentModal comment={comment} />}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default QuestionDetails
