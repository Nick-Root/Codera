import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import { useModal } from "../../context/Modal";
import { thunkGetAllQuestions, thunkPostOneQuestion, getCurrentQuestions } from '../../redux/question.js';
import {  } from '../../redux/question.js'
import "./CreateQuestionModal.css";
import { useLocation } from 'react-router-dom';


function CreateQuestionModal() {
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('');
  const [image, setImage] = useState('');
  const [topicId, setTopicId] = useState(1);  //default to the first topic/ topicId 1 when not selected
  //const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // const match = useRouteMatch();
  // console.log("match.url", match.url)
  const location = useLocation();
  console.log("location.pathname", location.pathname)
  // /, /questions, /questions/current

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

    // const dataObj = {
    //     question,
    //     topicId,
    //     image
    // };
    //console.log("dataObj with {topicId: topicId, question: question}", dataObj);

    const formData = new FormData ();
    formData.append("question", question)
    formData.append("topicId", topicId)
    formData.append("image", image)



    await dispatch(thunkPostOneQuestion(formData));

    if( location.pathname === "/" || location.pathname === "/questions"){
      await dispatch(thunkGetAllQuestions());

    } else if (location.pathname === "/questions/current") {
      await dispatch(getCurrentQuestions());
    }

    setQuestion('');
    // setValidationErrors({});
    // setHasSubmitted(false);

    closeModal();
  }

  return (
    <div id="create-question-modal-container">
      <div className="question-form-container">
       <div id="heading">Ask a Question</div>
       <form onSubmit={onSubmit} encType="multipart/form-data">
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
           <div>
              <div>Upload an image</div>
              <input id='image-file-input'
                type='file'
                accept='image/*'
                onChange={e => setImage(e.target.files[0])}
              />
              </div>
              {/* removed onSubmit */}
           <button id="submit-question-button" >Submit</button>
       </form>
     </div>
    </div>
  );
}

export default CreateQuestionModal;
