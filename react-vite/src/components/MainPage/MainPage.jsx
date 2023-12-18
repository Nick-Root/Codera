import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";
import { thunkGetAllTopics } from "../../redux/topic";
import { NavLink } from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch();


    let questions = useSelector((state) => state.question)
    let topics = useSelector((state) => state.topic)

    useEffect(() => {
        dispatch(thunkGetAllQuestions())
        dispatch(thunkGetAllTopics())
    }, [dispatch])

    if (!questions, !topics) return null
    let arrQues = Object.values(questions)
    let arrTopic = Object.values(topics)
    console.log(arrTopic)
    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", arrQues);
    return (
        <>

            <div className='questions-container'>
                {arrQues.map((question) => (
                    <div className='question' key={question.id}>{question.question}</div>
                ))}
            </div>

            {/* All Topics */}
            <div>
                {arrTopic.map((topic) => (
                    <NavLink to={`/topics/${topic.id}`} key={topic.id}>
                        {topic?.topic}
                    </NavLink>
                ))}
            </div>

        </>

    )
}

export default MainPage
