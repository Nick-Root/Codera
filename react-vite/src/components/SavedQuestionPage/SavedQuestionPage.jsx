import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  thunkGetSavedQuestions } from "../../redux/question";


export default function SavedQuestion() {
    const dispatch = useDispatch();
    const saved = useSelector(state => state.question);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(thunkGetSavedQuestions());
    }, [dispatch]);

    if (!saved, !sessionUser) {
        return null;
    }

    const saves = Object.values(saved)


    return (
        <>
            <div>
                {sessionUser && saves.map(save => {
                    if (sessionUser.id === save.userId) {
                        return save?.questions.map(question => {
                            return <div key={question.id}>{question?.question}</div>
                        })
                    }
                })}
            </div>
        </>
    )

}