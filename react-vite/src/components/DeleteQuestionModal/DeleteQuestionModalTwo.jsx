import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";

import { thunkDeleteQuestion, getCurrentQuestions } from '../../redux/question';
import './DeleteQuestionModal.css'

const DeleteQuestionModalTwo = ({ id }) => {
    //const { id } = useParams()
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    console.log("DeleteQuestionModalTwo id", id)

    //check the data
    const questionState = useSelector((state) => state.question)
    console.log("questionState in DeleteQuestionModalTwo  ******", questionState)
    //good


    const deleteQuestion = async (e) => {
        e.preventDefault()
        //pass in the question's id
        await dispatch(thunkDeleteQuestion(id))
        await dispatch(getCurrentQuestions())
        closeModal()
    }

    return (
        <>
            <div id='delete_Question_container' className="login_container">
                <h2 className='delques'>Delete Question?</h2>
                <div className='delconfirm'>Are you sure you want to delete this Question?</div>
                <div className='modal-buttons'>
                    <button onClick={deleteQuestion}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default DeleteQuestionModalTwo
