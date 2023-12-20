import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSavedQuestions } from "../../redux/question";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSavedQuestion from "./DeleteSaveQuestion";
import { NavLink } from "react-router-dom";
import './savedQuestion.css'


export default function SavedQuestion() {
    const dispatch = useDispatch();
    const saved = useSelector(state => state.question);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(thunkGetSavedQuestions());
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

    return (
        <>
            <div className='container'>
                <div className="container_text">{length <= 1 ? `${length} saved question` : `${length} saved questions`}</div>
                <div >
                    {saves.map(save => {
                        if (sessionUser.id === save.userId) {
                            return <div key={save.id}>
                                {save?.questions.map(question => {
                                    return <div key={question.id} >
                                        <div className='one_question_container'>
                                            <NavLink to={`/questions/${question.id}`} style={{textDecoration: 'none', color:'black'}}>{question?.question}</NavLink>
                                            <div className="user_comments">
                                                <p className="userName">{sessionUser.username}</p>
                                                <p className="created-date">
                                                    Commented on:{" "}
                                                    {new Date(question.createdAt).toLocaleDateString(undefined, {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                                <div className="edit_delete_comment">
                                                    <div className="delete_comment">
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <OpenModalMenuItem
                                                            itemText='Delete'
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
                    })}
                </div>
            </div>
        </>
    )

}