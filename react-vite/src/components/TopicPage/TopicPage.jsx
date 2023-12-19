import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSingleTopic } from "../../redux/topic";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import UpdateTopicModal from "../UpdateTopicModal/UpdateTopicModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";
=======
import { NavLink } from "react-router-dom";

>>>>>>> 8ccbdabbb28c7e3932a099e088a48aa83a302dab

export default function TopicPage() {
    const { topicId } = useParams()
    console.log(topicId)
    const dispatch = useDispatch();
    const topicById = useSelector(state => state.topic);
    const userId = useSelector((state) => state.session.user.id)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(thunkGetSingleTopic(topicId));
    }, [dispatch, topicId]);

    if (!topicById) return null;

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
    if (!topic) return
    if (topic.length >= 1 && userId) {
        if (topic[0].ownerId === userId) ownercheck = true

    }

    return (
<<<<<<< HEAD
        <div>
            <ul className='updatetop'>
                {ownercheck && (<OpenModalMenuItem
                    itemText='Edit Topic'
                    onItemClick={closeMenu}
                    className='topmodal'
                    modalComponent={<UpdateTopicModal />}
                />)}
            </ul>
            <div>{topic[0]?.topic}</div>
            <div>
=======
        <div className="container">
            <div className="container_text">{topic[0]?.topic}</div>
            <div >
>>>>>>> 8ccbdabbb28c7e3932a099e088a48aa83a302dab
                {topic[0]?.questions.map(question => {
                    return <NavLink to={`/questions/${question.id}`} className='question'>
                        {question?.question}
                    </NavLink>
                })}
            </div>
        </div>
    )
}
