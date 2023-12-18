import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";
import { thunkGetAllTopics } from "../../redux/topic";
import { NavLink } from "react-router-dom";
import './MainPage.css'

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllQuestions())
        dispatch(thunkGetAllTopics())
    }, [dispatch])

    let questions = useSelector((state) => state.question)
    let topics = useSelector((state) => state.topic)

    if (!questions, !topics) return null
    let arrQues = Object.values(questions)
    let arrTopic = Object.values(topics)

    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", arrQues);
    return (
        <>
            <div className='mainpage'>

                {/* All Topics */}
                <div className='topicscont'>
                    <button className='createtopic'>+  Create Topic</button> {/* placeholder for a create topic modal */}
                    <h3 className='topicheader'>Topics</h3>
                    <div className='topics'>
                        {arrTopic.map((topic) => {
                            return (
                                <NavLink to={`/topics/${topic.id}`} key={topic.id} className='topic'>
                                    {topic.topic}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                <div className='questionscont'>
                    <div className='askaques'>
                        <p>Placeholder for ask a question box</p>
                        <p>(will have a modal button on the nav aswell)</p>
                    </div>
                    {arrQues.map((question) => {
                        return (
                            <NavLink to={`/questions/${question.id}`} className='question' key={question.id}>{question.question}
                                <p className="asker">
                                    {question.askerUsername}
                                </p>
                            </NavLink>
                        )
                    })}
                </div>


            </div>
        </>

    )
}

export default MainPage
