import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";
import { thunkGetAllTopics } from "../../redux/topic";
import { NavLink } from "react-router-dom";
import './MainPage.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateTopicModal from "../CreateTopicModal/CreateTopicModal";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)

    if (!user) {
        navigate('/')
    }

    const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

    const topics = useSelector((state) => state.topic);
    const questions = useSelector((state) => state.question);

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(thunkGetAllTopics());
            await dispatch(thunkGetAllQuestions());
            setIsLoadingQuestions(false);
        };

        fetchData();
    }, [dispatch]);

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


    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", arrQues);
    return (
        <>
            <div className='mainpage'>
                <div className='scroll-containter'>
                    <div className='topicscont'>
                        {user && (
                            <ul className='createtop'>
                                <OpenModalMenuItem
                                    itemText='Create Topic'
                                    onItemClick={closeMenu}
                                    className='topmodal'
                                    modalComponent={<CreateTopicModal />}
                                />
                            </ul>
                        )}

                        <h3 className='topicheader'>Topics</h3>
                        <div className='topics'>
                            {Object.values(topics).map((topic) => (
                                <NavLink to={`/topics/${topic.id}`} key={topic.id} className='topic'>
                                    {topic.topic === 'Python' ? (
                                        <>
                                            <i className="fa-brands fa-python"></i> {topic.topic}
                                        </>
                                    ) : topic.topic === 'JavaScript' ? (
                                        <>
                                            <i className="fab fa-js"></i> {topic.topic}
                                        </>
                                    ) : topic.topic === 'Express' ? (
                                        <>
                                            <i className="fa-solid fa-code"></i> {topic.topic}
                                        </>
                                    ) : topic.topic === 'SQL' ? (
                                        <>
                                            <i className="fa-solid fa-database"></i> {topic.topic}
                                        </>
                                    ) : topic.topic === 'HTML' ? (
                                        <>
                                            <i className="fa-brands fa-html5"></i> {topic.topic}
                                        </>
                                    ) : topic.topic === 'CSS' ? (
                                        <>
                                            <i className="fa-brands fa-css3-alt"></i> {topic.topic}
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-code"></i> {topic.topic}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='questionscont'>
                    {isLoadingQuestions ? (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        Object.values(questions).map((question) => (
                            <NavLink to={`/questions/${question.id}`} id='one_question_container' key={question.id}>
                                <div id="question-container">{question.question}</div>
                                {question.image && (
                                    <>
                                        <div id="grey-border"></div>
                                        <img id='question-image-container' src={question.image} alt="Question Image" />
                                        <div id="grey-border-2"></div>
                                    </>
                                )}
                                <div id="user-question">
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
                        )).reverse()
                    )}
                </div>
                <div className='scroll-containter'>
                    <div className='resourcescont'>
                        <h3 className='resourcesheader'>External Resoures</h3>
                        <div className='resimgs'>
                            <a href='https://developer.mozilla.org/en-US/'><img src='../../../../mdn_logo.png' className='resourceimg'></img></a>

                            <a href='https://www.python.org/doc/'><img src='../../../../python_logo.png' className='resourceimg'></img></a>

                            <a href='https://react.dev/reference/react/hooks'><img src='../../../../react_logo.png' className='resourceimg'></img></a>

                            <a href='https://redux.js.org/introduction/getting-started'><img src='../../../../redux_logo.png' className='resourceimg'></img></a>

                            <a href='https://sequelize.org/'><img src='../../../../sequelize_logo.png' className='resourceimg'></img></a>

                            <a href='https://expressjs.com/'><img src='../../../../express_logo.png' className='resourceimg'></img></a>
                        </div>
                        <ul className='footer'>
                            <h3 className="devteam">Dev Team</h3>
                            <NavLink to='https://github.com/Nick-Root' className={'footLink'}>Nick Root</NavLink>
                            <NavLink to='https://github.com/JomarAA' className={'footLink'}>Jomar Yanos</NavLink>
                            <NavLink to='https://github.com/anchiingn' className={'footLink'}>Anchi Nguyen</NavLink>
                            <NavLink to='https://github.com/howtojames' className={'footLink'}>James Ruan</NavLink>

                        </ul>
                    </div>
                </div>
            </div>

        </>

    )
}

export default MainPage
