import './QuestionDetails.css';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion, thunkFetchAddSavedQuestion, thunkFetchRemoveSavedQuestion } from '../../redux/question'
import { thunkPostComment } from '../../redux/comment';
import DeleteCommentModal from "../CommentModals/DeleteCommentModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useParams } from "react-router-dom";
import './QuestionDetails.css'
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal"
import UpdateCommentModal from '../CommentModals/UpdateCommentModal';
import { useNavigate } from 'react-router-dom';



const QuestionDetails = () => {
    const questionState = useSelector((state) => state.question || [])
    const { id } = useParams();
    const dispatch = useDispatch();
    const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const questionArray = Object.values(questionData)
    // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionData);
    const { 0: question, 1: comments } = questionData
    const user = useSelector((state) => state.session.user)
    // console.log("%c   LOOK HERE", "color: green; font-size: 18px", user);
    console.log(question?.saved, question?.id)
    const [commentText, setCommentText] = useState('');
    const [showSaved, setShowSaved] = useState(false)
    const navigate = useNavigate()

    if (!user) {
        navigate('/')
    }
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


    const saved = async (e) => {
        await dispatch(thunkFetchAddSavedQuestion(question.question, question.id))
        await dispatch(thunkGetOneQuestion(id))

    }

    const unsaved = async (e) => {
        await dispatch(thunkFetchRemoveSavedQuestion(question.id))
        await dispatch(thunkGetOneQuestion(id))
    }

    //itemText for edit modal, so that it opens when we click on the icon too, not just the text


    // console.log("questionState in QuestionDetails", questionState)
    return (
        <div className='container'>
            <div className="container_text">
                <div>{question.question}</div>
                {question.image && (
                    <>
                        <div id="grey-border-details"></div>
                        <img id='question-image-container-details' src={question.image}/>

                    </>
                )}
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

                            <OpenModalMenuItem
                                itemText={(<><i className="fa-solid fa-pen-to-square"></i> Edit</>)}
                                onItemClick={closeMenu}
                                className='updatequestionmodal'
                                modalComponent={<UpdateQuestionModal id={parseInt(id)} />}
                            >

                            </OpenModalMenuItem>
                        </div>
                    )}
                    {question?.saved.length === 0 ? (  // If there is a user and no one has saved this question, show the "Save" button.
                            <div className='save_b'>                
                                <button onClick={saved} className='save_button'>
                                    <i className="fa-regular fa-bookmark"></i> Save
                                </button>
                            </div>
                        ) : question.saved.some(save => save.userId === user.id) ? ( // If the user has already saved this question, show the "Saved" button.
                            <div className='save_b'>
                                <button onClick={unsaved} className='save_button'>
                                    <i className="fa-solid fa-bookmark"></i> Saved
                                </button>
                            </div>
                        ) : (                                        // If the user hasn't saved this question, show the "Save" button.
                            <div className='save_b'>
                                <button onClick={saved} className='save_button'> 
                                    <i className="fa-regular fa-bookmark"></i> Save
                                </button>
                            </div>
                        )}
                </div>
            </div>
            <div className="comments">
                <h3>Comments:</h3>
                <div className='create-comment'>
                    {user && (
                        <>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Enter your comment"
                            />
                            <button onClick={handleCommentSubmit} style={{ 'cursor': 'pointer' }} className='subcomm' disabled={commentText.length < 1}>Post Comment</button>
                        </>
                    )}
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
                                                <OpenModalMenuItem
                                                    itemText={(<><i className="fa-solid fa-pen-to-square"></i> Update</>)}
                                                    modalComponent={<UpdateCommentModal comment={comment} />}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <div className="delete_comment">
                                        {user && user.id === comment.ownerId && (
                                            <>
                                                <OpenModalMenuItem
                                                    itemText={(<><i className="fa-solid fa-trash-can"></i> Delete</>)}
                                                    modalComponent={<DeleteCommentModal comment={comment} />}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )).reverse()}
            </div>
        </div >

    )
}

export default QuestionDetails
