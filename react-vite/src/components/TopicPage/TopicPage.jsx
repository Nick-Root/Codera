import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleTopic } from "../../redux/topic";
import {  useParams } from "react-router-dom";


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
                    return <div key={question.id}>{question.question}</div>
                })}
            </div>
        </div>
    )
}
