import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";
import { thunkGetAllTopics } from "../../redux/topic";
import { NavLink } from "react-router-dom";
import './MainPage.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateTopicModal from "../CreateTopicModal/CreateTopicModal";
import UpdateQuestionModal from "../UpdateQuestionModal/UpdateQuestionModal";

const MainPage = () => {
    const dispatch = useDispatch();
    const [topicId, setTopicId] = useState(1);

    let questions = useSelector((state) => state.question)
    let topics = useSelector((state) => state.topic)

    // //needs to set topicId
    // const questionData = useSelector((state) => state.question.oneQuestion || [])
    // const { 0: questionText, 1: comments } = questionData
    // console.log("questionText.topicId", questionText.topicId)

    // //do not want to set state on first render, only on second and when it changes
    // useEffect(() => {
    //     setQuestion(questionText.question)
    //     setTopicId(questionText.topicId)
    // }, [questionData])


    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        dispatch(thunkGetAllQuestions())
        dispatch(thunkGetAllTopics())
    }, [dispatch])
    const ulRef = useRef();


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    if (!questions, !topics) return null
    let arrQues = Object.values(questions)
    let arrTopic = Object.values(topics)




    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", arrQues);
    console.log("arrQues", arrQues)
    return (
        <>
            <div className='mainpage'>

                {/* All Topics */}
                <div className='topicscont'>

                    <ul className='createtop'>
                        <OpenModalMenuItem
                            itemText='Create Topic'
                            onItemClick={closeMenu}
                            className='topmodal'
                            modalComponent={<CreateTopicModal />}
                        />
                    </ul>


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
                    {arrQues.map((question) => {
                        return (
                            <>
                            <NavLink to={`/questions/${question.id}`} className='question' key={question.id}>{question.question}
                                <p className="asker">
                                    {question.askerUsername}
                                </p>
                            </NavLink>
                            {/* <div id="edit-question-button-main">
                                <OpenModalMenuItem
                                    itemText='Edit'
                                    onItemClick={closeMenu}
                                    className='topmodal'
                                    modalComponent={<UpdateQuestionModal id={question.id}/>}
                                />
                            </div> */}
                            </>

                        )
                    })}
                </div>

            </div>

        </>

    )
}

export default MainPage
