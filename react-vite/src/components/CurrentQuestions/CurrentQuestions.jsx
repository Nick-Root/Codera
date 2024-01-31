import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentQuestions } from "../../redux/question"
import './CurrentQuestions.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateQuestionModalTwo from "../UpdateQuestionModal/UpdateQuestionModalTwo";
import DeleteQuestionModalTwo from "../DeleteQuestionModal/DeleteQuestionModalTwo";
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import CreateQuestionModal from "../CreateQuestionModal/CreateQuestionModal";


const CurrentQuestions = () => {
    const dispatch = useDispatch()
    const questionState = useSelector((state) => state.question)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(getCurrentQuestions())  //gets current quesitons, (thunk)
        setIsLoading(false)
    }, [dispatch])



    const questions = useSelector((state) => state.question.userQuestions || [])
    console.log("questionsState.userQuestions in CurrentQuestions", questions)
    const user = useSelector((state) => state.question.user)

    let sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) {
        navigate('/')
    }
    console.log("Curr user questions", questions)
    console.log("Curr user question user", user)
    if (!questions) return null

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


    console.log("questionState in CurrentQuestions", questionState, questions)
    return (
        <div className="container">
            {/* Render container_text only if there are questions */}
            {isLoading || questions.length > 0 ? (
                <div className="container_text">Your Questions</div>
            ) : null}

            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : questions.length === 0 ? (
                <div className="no-saved-questions">
                    <h3>Looks like you have no saved questions. Explore the community to find something that interests you with this button below:</h3>
                    <div id="ask-question-button">
                        <OpenModalMenuItem
                            itemText='Add question'
                            onItemClick={closeMenu}
                            className='questionmodal'
                            modalComponent={<CreateQuestionModal />}
                        />
                    </div>
                </div>
            ) : (
                questions.map((question) => (

                    <div key={question.id} id="one_question_container">
                        <NavLink to={`/questions/${question.id}`} className='navtopage'>{question.question}</NavLink>
                        {question.image && (
                            <>
                                <div id="grey-border"></div>
                                <img id='question-image-container' src={question.image} />
                                <div id="grey-border-2"></div>
                            </>
                        )}
                        <div className="user_questions">
                            <p className="userName">{user.username}</p>
                            <p className="created-date">
                                Asked:{" "}
                                {new Date(question.createdAt).toLocaleDateString(undefined, {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                            <div className="edit_delete_question">
                                <div className="update_question">
                                    <OpenModalMenuItem
                                        itemText={(<><i className="fa-solid fa-pen-to-square"></i> Update</>)}
                                        modalComponent={<UpdateQuestionModalTwo id={question.id} />}
                                    />
                                </div>
                                <div className="delete_question">
                                    <OpenModalMenuItem
                                        itemText={(<><i className="fa-solid fa-trash-can"></i> Delete</>)}
                                        modalComponent={<DeleteQuestionModalTwo id={question.id} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                )).reverse())}
        </div>
    );

}

export default CurrentQuestions
