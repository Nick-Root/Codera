import './QuestionDetails.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from '../../redux/question'
import { useParams } from "react-router-dom";




const QuestionDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const question = useSelector((state) => state.oneQuestion)

    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", question);

    useEffect(() => {
        if (id) {
            dispatch(thunkGetOneQuestion)
        }
    }, [dispatch, id])


    if (!question) {
        return null
    }


    return (
        <>
            <h1>TEST</h1>
        </>
    )
}

export default QuestionDetails
