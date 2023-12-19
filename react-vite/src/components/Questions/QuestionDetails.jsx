import './QuestionDetails.css';
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion, thunkFetchAddSavedQuestion } from '../../redux/question'
import { thunkPostComment } from '../../redux/comment';
import { useParams } from "react-router-dom";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal";

const QuestionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const questionArray = Object.values(questionData)
    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionData);
    const { 0: question, 1: comments } = questionData
    // console.log("%c   LOOK HERE", "color: green; font-size: 18px", comments);

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
    return (
        <div className='one_question_container'>
            <h2>{question.question}</h2>
            <p className='userName'>{question.askerUsername}</p>
            <p className='created-date'>
                Asked:{" "}
                {new Date(question.createdAt).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: "long",
                    year: "numeric",
                })}
            </p>
            <button onClick={saved}>save</button>
            {/* edit question button/modal */}
            <div id="update-question-button">
                <OpenModalMenuItem
                    itemText='Edit'
                    onItemClick={closeMenu}
                    className='updatequestionmodal'
                    modalComponent={<UpdateQuestionModal id={parseInt(id)}/>}
                />
            </div>
            <div></div>
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
                        <p>{comment.comment}</p>
                        <p className='comment-date'>
                            Commented by: {comment.username}{" "} on {' '}
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                day: 'numeric',
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div >

    )
}

export default QuestionDetails
