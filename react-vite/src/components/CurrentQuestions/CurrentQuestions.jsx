import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentQuestions } from "../../redux/question"
import './CurrentQuestions.css'

const CurrentQuestions = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCurrentQuestions())
    }, [dispatch])
    const questions = useSelector((state) => state.question.userQuestions)
    const user = useSelector((state) => state.question.user)
    console.log("Curr user questions", questions)
    console.log("Curr user question user", user)
    if (!questions) return null
    if (!user) return null

    console.log("inside CurrentQuestions")
    return (
        <div className="container">
            <div className="container_text">Your Questions</div>
            {questions.map((question) => (
                <div key={question.questionId} className="one_question_container">
                    <div>{question.question}</div>
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
                    </div>
                </div>
            ))}
        </div>
    );

}

export default CurrentQuestions
