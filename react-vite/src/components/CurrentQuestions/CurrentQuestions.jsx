import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentQuestions } from "../../redux/question"
import './CurrentQuestions.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import UpdateQuestionModalTwo from "../UpdateQuestionModal/UpdateQuestionModalTwo";
import DeleteQuestionModalTwo from "../DeleteQuestionModal/DeleteQuestionModalTwo";
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";


const CurrentQuestions = () => {
    const dispatch = useDispatch()
    const questionState = useSelector((state) => state.question)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

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


    console.log("questionState in CurrentQuestions", questionState, questions)
    return (
        <div className="container">
            <div className="container_text">Your Questions</div>


            {isLoading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
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

                                    <i className="fa-solid fa-pen-to-square"></i>
                                    <OpenModalMenuItem
                                        itemText='Update'
                                        modalComponent={<UpdateQuestionModalTwo id={question.id} />}
                                    />
                                </div>
                                <div className="delete_question">
                                    <i className="fa-solid fa-trash-can"></i>
                                    <OpenModalMenuItem
                                        itemText='Delete'
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
