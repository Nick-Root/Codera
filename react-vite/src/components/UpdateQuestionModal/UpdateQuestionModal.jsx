import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { thunkGetOneQuestion, thunkUpdateOneQuestion } from '../../redux/question.js';

import "./UpdateQuestionModal.css";


function UpdateQuestionModal({ id }) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [topicId, setTopicId] = useState(1);  //default to the first topic/ topicId 1 when not selected
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const allTopics = useSelector(state => state.topic)  //object of objects
  //if(!allTopics) return null;
  //console.log("allTopics", allTopics)
  const arrAllTopics = Object.values(allTopics);  //array of objects
  //console.log("topicsArr", arrAllTopics)

  //from QuestionDetails destructure the datas
  const questionData = useSelector((state) => state.question.oneQuestion || [])
  const { 0: questionText, 1: comments } = questionData
  console.log("questionText.topicId", questionText.topicId)

  //do not want to set state on first render, only on second and when it changes
  useEffect(() => {
    setQuestion(questionText.question)
    setTopicId(questionText.topicId)
  }, [questionData])


  //might not need it because main page uses thunkGetAllTopics
  //Also fetch for the question data
  useEffect(() => {
    dispatch(thunkGetAllTopics());
    //dispatch(thunkGetOneQuestion(id)); //need to get that form's data, so need
  }, [dispatch]);


  const onSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    //include the id this time
    const dataObj = {
        id,
        question,
        topicId
    };
    console.log("dataObj with {topicId: topicId, question: question}", dataObj);

    const serverResponse = await dispatch(thunkUpdateOneQuestion(id, dataObj));
    console.log("serverResponse", serverResponse)
    await dispatch(thunkGetOneQuestion(id))

    setQuestion('');
    // setValidationErrors({});
    // setHasSubmitted(false);
    closeModal();
  }

  return (
    <div id="update-question-modal-container">
      <div className="question-form-container">
       <div id="heading">Edit your question</div>
       <form onSubmit={onSubmit}>
           <div className="input-container">
                <input
                    id="question-input"
                    type='text'
                    placeholder=''
                    onChange={e => setQuestion(e.target.value)}  //changes the state first
                    value={question}  //then we get it from the state
                />
           </div>
           <div className='error'>
           {/* {hasSubmitted && validationErrors.question && `* ${validationErrors.question}`} */}
           </div>
           <div className="input">
                <select onChange={e => setTopicId(e.target.value)} value={topicId}>
                    {arrAllTopics.map((topicObj) => (
                        //value is topicObj.id because we want to pass that back
                        <option key={topicObj.id} value={topicObj.id}>{topicObj.topic}</option>
                    ))}
                </select>
           </div>
           <button id="submit-question-button" onClick={onSubmit} >Submit</button>
       </form>
     </div>
    </div>
  );
}

export default UpdateQuestionModal;
