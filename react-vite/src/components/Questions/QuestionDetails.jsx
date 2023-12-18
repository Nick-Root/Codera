import './QuestionDetails.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from '../../redux/question'
import { useParams } from "react-router-dom";




const QuestionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const questionArray = Object.values(questionData)
    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", questionData);
    const { 0: question, 1: user } = questionData
    console.log("%c   LOOK HERE", "color: green; font-size: 18px", question);



    useEffect(() => {
        dispatch(thunkGetOneQuestion(id))
    }, [dispatch, id])


    if (!question) {
        return null
    }


    return (
        <div className='one_question_container'>
            <h2>{question.question}</h2>
            <p className='userName'>{user.username}</p>
            <p className='created-date'>
                Asked:{" "}
                {new Date(question.createdAt).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: "long",
                    year: "numeric",
                })}
            </p>
        </div>
    )
}

export default QuestionDetails
