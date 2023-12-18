import './QuestionDetails.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from '../../redux/question'
import { useParams } from "react-router-dom";




const QuestionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const question = useSelector((state) => state.question.oneQuestion)
    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", question);


    useEffect(() => {
        dispatch(thunkGetOneQuestion(id))
    }, [dispatch, id])


    if (!question) {
        return null
    }


    return (
        <div className='one_question_container'>
            <h2>{question.question}</h2>
        </div>
    )
}

export default QuestionDetails
