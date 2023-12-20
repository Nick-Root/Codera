import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleTopic } from "../../redux/topic";
import { useParams } from "react-router-dom";
import UpdateTopicModal from "../UpdateTopicModal/UpdateTopicModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import './TopicPage.css'

export default function TopicPage() {
    const { topicId } = useParams()
    console.log(topicId)
    const dispatch = useDispatch();
    const topicById = useSelector(state => state.topic);
    const userId = useSelector((state) => state.session.user?.id)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId));
    }, [dispatch, topicId]);

    if (!topicById) return null;
    // if (!userId) return null
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const topic = Object.values(topicById)
    console.log("Topic", topic)
    let ownercheck = false
    if (!topic || topic.length === 0) return null
    if (topic.length >= 1 && userId) {
        if (topic[0].ownerId === userId) ownercheck = true

    }

    return (
        <div className="container">
            {ownercheck && (
                <div className="edit_topic">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <OpenModalMenuItem
                        itemText='Edit Topic'
                        onItemClick={closeMenu}
                        className='topmodal'
                        modalComponent={<UpdateTopicModal />}
                    />
                </div>
            )}
            <div className="container_text">
                {topic[0].topic === 'Python' ? (
                    <>
                        <i className="fa-brands fa-python"></i> {topic[0].topic}
                    </>
                )
                    : topic[0].topic === 'JavaScript' ? (
                        <>
                            <i className="fab fa-js"></i> {topic[0].topic}
                        </>
                    )
                        : topic[0].topic === 'Express' ? (
                            <>
                                <i className="fa-solid fa-code"></i> {topic[0].topic}
                            </>
                        )
                            : topic[0].topic === 'SQL' ? (
                                <>
                                    <i className="fa-solid fa-database"></i> {topic[0].topic}
                                </>
                            )
                                : topic[0].topic === 'HTML' ? (
                                    <>
                                        <i className="fa-brands fa-html5"></i> {topic[0].topic}
                                    </>
                                )
                                    : topic[0].topic === 'CSS' ? (
                                        <>
                                            <i className="fa-brands fa-css3-alt"></i> {topic[0].topic}
                                        </>
                                    )
                                        : (
                                            <>
                                                <i className="fa-solid fa-code"></i> {topic[0].topic}
                                            </>
                                        )}
            </div>
            <div>
                {topic[0]?.questions.map(question => {
                    return <NavLink to={`/questions/${question.id}`} className='question'>
                        {question?.question}
                    </NavLink>
                }).reverse()}
            </div>
        </div>
    )
}
