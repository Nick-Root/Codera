import { useState, useEffect } from 'react';
//import { thunkPostOneQuestion } from '../../redux/question';
import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';
import { thunkPostOneQuestion } from '../../redux/question.js';
import './QuestionForm.css'

function QuestionForm() {
   const [question, setQuestion] = useState('');
   const [topicId, setTopicId] = useState(1);  //default to the first topic/ topicId 1 when not selected
   const dispatch = useDispatch();


   useEffect(() => {
       dispatch(thunkGetAllTopics());
   }, [dispatch]);


   const allTopics = useSelector(state => state.topic)  //object of objects
   //if(!allTopics) return null;
   //console.log("allTopics", allTopics)

   const arrAllTopics = Object.values(allTopics);  //array of objects
   //console.log("topicsArr", arrAllTopics)

   //const arrTopic = arrAllTopics.map(obj => obj.topic);
   //console.log("arrTopics", arrTopics)  //['Python', 'JavaScript', 'Express']


   // front-end validations
   // const [validationErrors, setValidationErrors] = useState({});
   // const [hasSubmitted, setHasSubmitted] = useState(false);
   // useEffect(() => {
   //     const errors = {};
   //     if(question.length <= 0){
   //       errors.question = 'Please enter a question';
   //     }
   //     setValidationErrors(errors);
   //   }, [question]);


   const onSubmit = e => {
       // Prevent the default form behavior so the page doesn't reload.
       e.preventDefault();
       // setHasSubmitted(true);

       //question and topicId
       const dataObj = {
           question,
           topicId
       };
       console.log("dataObj with {topicId: topicId, question: question}", dataObj );
       dispatch(thunkPostOneQuestion(dataObj));

       setQuestion('');
       // reset validation errors to empty object
       // setValidationErrors({});
       // reset hasSubmitted to false
       // setHasSubmitted(false);
   }

   //state check
   //console.log("question", question)
   //console.log("topicId", topicId)
   return (
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
   )
}


export default QuestionForm;
