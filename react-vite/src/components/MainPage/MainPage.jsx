import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllQuestions } from "../../redux/question";



const MainPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions)
    console.log("%c   LOOK HERE", "color: red; font-size: 18px", questions);

    useEffect(() => {
        dispatch(thunkGetAllQuestions())
    }, [dispatch])


    return (
        <>
            <div>Hi</div>

        </>

    )
}

export default MainPage
