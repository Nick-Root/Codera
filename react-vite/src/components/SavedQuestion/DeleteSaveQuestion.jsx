import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkFetchRemoveSavedQuestion, thunkGetSavedQuestions } from "../../redux/question";
import './DeleteSaveQuestion.css'

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
            <div className="modal_container">
                <h1>Delete saved question?</h1>
                <div>Are you sure you want to remove this question from the saved list?</div>
                <div className="delete_buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={removeQuestion}>Delete</button>
                </div>
            </div>
        </>
    )
}