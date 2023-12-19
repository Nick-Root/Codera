import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchRemoveSavedQuestion, thunkGetSavedQuestions } from "../../redux/question";

export default function DeleteSavedQuestion({ question }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const removeQuestion = async (e) => {
        e.preventDefault()
        await dispatch(thunkFetchRemoveSavedQuestion(question.id))
        await dispatch(thunkGetSavedQuestions())
            .then(closeModal)

    }

    return (
        <>
            <div id='login_container' className="delete_container">
                <div>Delete saved question?</div>
                <div>Are you sure you want to remove this question from the saved list?</div>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={removeQuestion}>Delete</button>
                </div>
            </div>
        </>
    )
}
