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
            <div>{length === 1 ? `${length} saved question` : `${length} saved questions`}</div>
            <div className='savedQuestion_page'>
                {saves.map(save => {
                    if (sessionUser.id === save.userId) {
                        return <div>
                            {save?.questions.map(question => {
                                return <div key={question.id} >
                                    <NavLink to={`/questions/${question.id}`} className='question'>
                                        {question?.question}
                                    </NavLink>
                                    <div className="delete_sq">
                                        <i className="fa-solid fa-trash-can"></i>
                                        <OpenModalMenuItem
                                            itemText='Delete'
                                            modalComponent={<DeleteSavedQuestion question={question} />}
                                        />
                                    </div>
                                </div>
                            })}
                        </div>
                    }
                })}
            </div>
        </>
    )

}