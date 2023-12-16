import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";



const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllQuestions())
    }, [dispatch])


    let questions = useSelector((state) => state.question)
    if (!questions) return null
    let arrQues = Object.values(questions)
    console.log("%c   LOOK HERE", "color: red; font-size: 18px", arrQues);
    return (
        <>

            <div className='questions-container'>
                {arrQues.map((question) => (
                    <div className='question' key={question.id}>{question.question}</div>
                ))}

            </div>

        </>

    )
}

export default MainPage
