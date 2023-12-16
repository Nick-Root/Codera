import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTopics, thunkGetSingleTopic } from "../../redux/topic";
import { NavLink, useParams } from "react-router-dom";


export default function TopicPage() {
    const {topicId} = useParams()
    console.log(topicId)
    const dispatch = useDispatch();
    const topicById = useSelector(state => state.topic);

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId));
    }, [dispatch, topicId]);

    if (!topicById) {
        return null;
    }

    const topic = Object.values(topicById)
    

    return (
        <div>
            <div>{topic[0]?.topic}</div>
            <div>
                {topic[0]?.questions.map(question => {
                    return <div>{question.question}</div>
                })}
            </div>
        </div>
    )
}

