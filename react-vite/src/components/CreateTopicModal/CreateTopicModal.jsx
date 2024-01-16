import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createTopicThunk, thunkGetAllTopics } from "../../redux/topic";
import './CreateTopicModal.css'


function CreateTopicModal() {
    const dispatch = useDispatch()
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const existingTopics = useSelector(state => Object.values(state.topic) || [])

    useEffect(() => {
        dispatch(thunkGetAllTopics)
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("existing topics", existingTopics)
        const isDuplicate = existingTopics.some(existingTopic => existingTopic.topic.toLowerCase() === topic.toLowerCase());

        if (isDuplicate) {
            setErrors(["Topic name already exists"]);
            return;
        }
        const serverResponse = await dispatch(
            createTopicThunk({
                topic
            })
        )
        await dispatch(thunkGetAllTopics())

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            closeModal()
        }
    }

    return (
        <div className='topmodalcont'>
            <h1>Create a Topic</h1>
            <form onSubmit={handleSubmit} className='topform'>
                <label>
                    <input
                        type='text'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        placeholder="Topic Name"
                        className='topname'
                    />
                </label>
                {<p className="error">{errors}</p>}
                <button type='submit' disabled={topic.length === 0} className='topbutton'>Create Topic</button>
            </form>
        </div>
    )
}

export default CreateTopicModal
