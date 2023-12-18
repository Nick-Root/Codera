import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createTopicThunk } from "../../redux/topic";

function CreateTopicModal() {
    const dispatch = useDispatch()
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const serverResponse = await dispatch(
            createTopicThunk({
                topic
            })
        )

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            closeModal()
        }

    }
    return (
        <>
            <h1>Create a Topic</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Topic
                    <input
                        type='text'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    />
                </label>
                {<p>{errors}</p>}
                <button type='submit' disabled={topic.length === 0}>Create Topic</button>
            </form>
        </>
    )
}

export default CreateTopicModal
