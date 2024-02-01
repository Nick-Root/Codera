import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSavedQuestions } from "../../redux/question";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSavedQuestion from "./DeleteSaveQuestion";
import { NavLink } from "react-router-dom";
import './savedQuestion.css'
import { useNavigate } from "react-router-dom";


export default function SavedQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const saved = useSelector(state => state.question);
    let sessionUser = useSelector((state) => state.session.user);
    const [isLoading, setIsLoading] = useState(true)
    if (!sessionUser) {
        navigate('/')
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await dispatch(thunkGetSavedQuestions());
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (!saved || !sessionUser) {
        return null;
    }

    const saves = Object.values(saved)

    let length = 0
    for (let save of saves) {
        if (sessionUser.id === save.userId) {
            length += save.questions.length
        }
    }

    if (!isLoading && length === 0) {
        return (
            <div className='no-saved-questions'>
                <h3>Looks like you have no saved questions. Explore the community to find something that interests you.</h3>
                <button id="ask-question-button" onClick={() => navigate('/questions')}>Explore Questions</button>
            </div>
        );
    }


    return (
        <>
            <div className='container'>
                {!isLoading && <div className="container_text">{length <= 1 ? `${length} saved question` : `${length} saved questions`}</div>}
                <div>
                    {isLoading ? (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        saves.map(save => {
                            if (sessionUser.id === save.userId) {
                                return <div key={save.id}>
                                    {save?.questions.map(question => {
                                        return <div key={question.id} >
                                            <div id='one_question_container'>
                                                <NavLink to={`/questions/${question.id}`} className='navtopage' id="question-container">{question?.question}</NavLink>
                                                {question.image && (
                                                    <>
                                                        <div id="grey-border"></div>
                                                        <img id='question-image-container' src={question.image} />
                                                        <div id="grey-border-2"></div>
                                                    </>
                                                )}
                                                <div className="user_comments">
                                                    <p className="created-date">
                                                        Saved on:{" "}
                                                        {new Date().toLocaleDateString(undefined, {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </p>
                                                    <div className="edit_delete_comment">
                                                        <div className="delete_comment">
                                                            <OpenModalMenuItem
                                                                itemText={(<><i className="fa-solid fa-trash-can"></i> Delete</>)}
                                                                modalComponent={<DeleteSavedQuestion question={question} />}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            }
                        }).reverse())}
                </div>
            </div>
        </>
    )

}
