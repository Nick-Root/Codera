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


    return (
        <>
            <div className='savedQuestion_page'>
                {sessionUser && saves.map(save => {
                    if (sessionUser.id === save.userId) {
                        return save?.questions.map(question => {
                            return <div key={question.id} >
                                <div>
                                    <NavLink to={`/questions/${question.id}`} className='question'>
                                        {question?.question}
                                    </NavLink>
                                    <div>
                                        <OpenModalMenuItem
                                            itemText='Delete'
                                            modalComponent={<DeleteSavedQuestion question={question} />}
                                        />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                })}
            </div>
        </>
    )

}