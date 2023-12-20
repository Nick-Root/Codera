import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";
import { thunkGetAllTopics } from "../../redux/topic";
import { NavLink } from "react-router-dom";
import './MainPage.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateTopicModal from "../CreateTopicModal/CreateTopicModal";


const MainPage = () => {
    const dispatch = useDispatch();
    //const navigate = useNavigate()

    let questions = useSelector((state) => state.question)
    let topics = useSelector((state) => state.topic)

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
                                    {topic.topic === 'Python' ? (
                                        <>
                                            <i className="fa-brands fa-python"></i> {topic.topic}
                                        </>
                                    )
                                        : topic.topic === 'JavaScript' ? (
                                            <>
                                                <i className="fab fa-js"></i> {topic.topic}
                                            </>
                                        )
                                            : topic.topic === 'Express' ? (
                                                <>
                                                    <i className="fa-solid fa-code"></i> {topic.topic}
                                                </>
                                            )
                                                : topic.topic === 'SQL' ? (
                                                    <>
                                                        <i className="fa-solid fa-database"></i> {topic.topic}
                                                    </>
                                                )
                                                    : topic.topic === 'HTML' ? (
                                                        <>
                                                            <i className="fa-brands fa-html5"></i> {topic.topic}
                                                        </>
                                                    )
                                                        : topic.topic === 'CSS' ? (
                                                            <>
                                                                <i className="fa-brands fa-css3-alt"></i> {topic.topic}
                                                            </>
                                                        )
                                                            : (
                                                                <>
                                                                    <i className="fa-solid fa-code"></i> {topic.topic}
                                                                </>
                                                            )}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                <div className='questionscont'>
                    {arrQues.map((question) => {
                        return (
                            <NavLink to={`/questions/${question.id}`} className='one_question_container' key={question.id}>
                                {question.question}
                                <div className="user_questions">
                                    <p className="userName">{question.askerUsername}</p>
                                    <p className="created-date">
                                        Asked:{" "}
                                        {new Date(question.createdAt).toLocaleDateString(undefined, {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </NavLink>
                        )
                    }).reverse()}
                </div>
                <div className='resourcescont'>
                    <h3 className='resourcesheader'>External Resoures</h3>
                    <div className='resimgs'>
                        <a href='https://developer.mozilla.org/en-US/'><img src='../../../../mdn_logo.png' className='resourceimg'></img></a>

                        <a href='https://www.python.org/doc/'><img src='../../../../python_logo.png' className='resourceimg'></img></a>

                        <a href='https://react.dev/reference/react/hooks'><img src='../../../../react_logo.png' className='resourceimg'></img></a>

                        <a href='https://redux.js.org/introduction/getting-started'><img src='../../../../redux_logo.png' className='resourceimg'></img></a>

                        <a href='https://sequelize.org/'><img src='../../../../sequelize_logo.png' className='resourceimg'></img></a>
                    </div>
                </div>

            </div>

        </>

    )
}

export default MainPage
