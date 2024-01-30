//this is for updating questions on questions/:id page
import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import { useModal } from "../../context/Modal";
import { thunkGetOneQuestion, thunkUpdateOneQuestion } from '../../redux/question.js';

import "./UpdateQuestionModal.css";


function UpdateQuestionModal({ id }) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState('');  //added
  const [topicId, setTopicId] = useState(1);  //default to the first topic/ topicId 1 when not selected
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  //might not need it because main page uses thunkGetAllTopics
  //Also fetch for the question data
  useEffect(() => {
    dispatch(thunkGetAllTopics());
    //dispatch(thunkGetOneQuestion(id)); //need to get that form's data, so need
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkGetOneQuestion(id))
  }, [dispatch, id])

  console.log("UpdateQuestionModal id", id)



  const allTopics = useSelector(state => state.topic)  //object of objects
  //if(!allTopics) return null;
  //console.log("allTopics", allTopics)c
  const arrAllTopics = Object.values(allTopics);  //array of objects
  //console.log("topicsArr", arrAllTopics)

  //console.log("as;ldkjf;asldkjf;aslkdjf;alskjdf;aslkjdf")
  //const questionState = useSelector((state) => state.question)
  //console.log("questionState", questionState)


  //from QuestionDetails destructure the datas
  const questionData = useSelector((state) => state.question.oneQuestion)
  //console.log("questionData", questionData)
  const { 0: questionText = "default text"} = questionData
  //console.log("questionText.topicId", questionText.topicId)



  //do not want to set state on first render, only on second and when it changes
  useEffect(() => {
    setQuestion(questionText.question)
    setTopicId(questionText.topicId)
  }, [questionData, questionText.question, questionText.topicId])


  const onSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    //include the id this time
    // const dataObj = {
    //     id,
    //     question,
    //     topicId
    // };
    //console.log("dataObj with {topicId: topicId, question: question}", dataObj);

    const formData = new FormData ();
    formData.append("question", question)
    formData.append("topicId", topicId)
    formData.append("image", image)

    const serverResponse = await dispatch(thunkUpdateOneQuestion(id, formData));
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
           <div id="choose-a-topic">Choose a topic</div>
           <div className="input">
                <select onChange={e => setTopicId(e.target.value)} value={topicId}>
                    {arrAllTopics.map((topicObj) => (
                        //value is topicObj.id because we want to pass that back
                        <option key={topicObj.id} value={topicObj.id}>{topicObj.topic}</option>
                    ))}
                </select>
           </div>
           <div>
              <div id="update-image">Update image </div>
              {/* <div id="image-blank-note">{`(Submitting without a picture will delete your current picture)`}</div> */}
              <label for='image-input' className="testing">
                <input
                  id="image-input"
                  type='file'
                  accept='image/*'
                  onChange={e => setImage(e.target.files[0])}
                />
              </label>
            </div>
           <button id="submit-question-button" onClick={onSubmit}>Submit</button>
       </form>
     </div>
    </div>
  );
}

export default UpdateQuestionModal;
