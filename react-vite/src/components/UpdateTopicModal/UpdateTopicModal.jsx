import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateTopicThunk } from "../../redux/topic";
// import { thunkGetAllTopics } from "../../redux/topic";
import { useParams } from "react-router-dom";
import { thunkGetSingleTopic } from "../../redux/topic";


function UpdateTopicModal() {
    const { topicId } = useParams()
    const dispatch = useDispatch()
    const [topic, setTopic] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()
    const topicById = useSelector(state => state.topic);
    const existingTopics = useSelector(state => Object.values(state.topic) || [])

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId));
    }, [dispatch, topicId]);
    useEffect(() => {
        setTopic(topicById[0]?.topic);
    }, [topicById]);
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("existing topics", existingTopics)
        const isDuplicate = existingTopics.some(existingTopic => existingTopic.topic.toLowerCase() === topic.toLowerCase());

        if (isDuplicate) {
            setErrors(["Topic name already exists"]);
            return;
        }
        const serverResponse = await dispatch(
            updateTopicThunk(
                topicId, topic
            )
        )
        await dispatch(thunkGetSingleTopic(topicId))

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            closeModal()
        }
        closeModal()
    }

    return (
        <div className='topupmodalcont'>
            <h1>Update Your Topic</h1>
            <form onSubmit={handleSubmit} className='topupform'>
                <label>
                    <input
                        type='text'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        placeholder="Topic Name"
                        className='topupname'
                    />
                </label>


                <button type='submit' disabled={topic.length === 0} className='topupbutton'>Update Topic</button>
            </form>
        </div>
    )
}

export default UpdateTopicModal
