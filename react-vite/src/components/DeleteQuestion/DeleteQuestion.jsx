import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteQuestion } from "../../redux/question";
import { useNavigate } from "react-router-dom";


export default function DeleteQuestion ({ question }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigation = useNavigate()

    const removeQuestion = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteQuestion(question.id))
        .then(navigation('/spots/current'))
        .then(closeModal)

    }

    return (
        <>
        <div>
            <div>Confirm Delete</div>
            <div>Are you sure you want to remove this question?</div>
            <div>
                <button onClick={removeQuestion}>Yes (Delete Question)</button>
                <button onClick={closeModal}>No (Keep Question)</button>
            </div>
        </div>
        </>
    )
}