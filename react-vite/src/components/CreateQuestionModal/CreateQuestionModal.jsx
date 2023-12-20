import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import { useModal } from "../../context/Modal";
import { thunkPostOneQuestion } from '../../redux/question.js';
import "./CreateQuestionModal.css";


function CreateQuestionModal() {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [topicId, setTopicId] = useState(1);  //default to the first topic/ topicId 1 when not selected
  //const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const allTopics = useSelector(state => state.topic)  //object of objects
  //if(!allTopics) return null;
  //console.log("allTopics", allTopics)
  const arrAllTopics = Object.values(allTopics);  //array of objects
  //console.log("topicsArr", arrAllTopics)

  //might not need it because main page uses thunkGetAllTopics
  useEffect(() => {
    dispatch(thunkGetAllTopics());
  }, [dispatch]);


  const onSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    const dataObj = {
        question,
        topicId
    };
    console.log("dataObj with {topicId: topicId, question: question}", dataObj);

    const serverResponse = await dispatch(thunkPostOneQuestion(dataObj));
    console.log("serverResponse", serverResponse)

    setQuestion('');
    // setValidationErrors({});
    // setHasSubmitted(false);

    closeModal();
  }

  return (
    <div id="create-question-modal-container">
      <div className="question-form-container">
       <div id="heading">Ask a Question</div>
       <form onSubmit={onSubmit}>
           <div className="input-container">
                <input
                    id="question-input"
                    type='text'
                    placeholder='Start your question with "What", "How", "Why", etc.'
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

export default CreateQuestionModal;
