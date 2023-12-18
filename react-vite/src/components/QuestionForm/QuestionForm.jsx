import { useState, useEffect } from 'react';
import { thunkPostOneQuestion } from '../../redux/question';
import { thunkGetAllTopics } from '../../redux/topic';
import { useDispatch, useSelector } from 'react-redux';


function QuestionForm() {
   const [question, setQuestion] = useState('');
   const [topic, setTopic] = useState('');
   const dispatch = useDispatch();


   useEffect(() => {
       dispatch(thunkGetAllTopics());
   }, [dispatch]);


   const allTopics = useSelector(state => state.topic)
   console.log("allTopics", allTopics)








   //const useSelector = useSelector(state => state.topics.)




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


       const newQuestion = {
           question
       };
       console.log("onSubmit newQuestion", newQuestion);
       dispatch(thunkPostOneQuestion(newQuestion));


       setQuestion('');
       // reset validation erros to empty object
       // setValidationErrors({});
       // reset hasSubmitted to false
       // setHasSubmitted(false);
   }


   return (
     <div>
       <h2>Ask a Question</h2>
       <form onSubmit={onSubmit}>
           <div>
           <label htmlFor='question'>Question:</label>
           <input
               id='question'
               type='text'
               onChange={e => setQuestion(e.target.value)}  //changes the state first
               value={question}  //then we get it from the state
           />
           </div>
           {/* we want to test both of these conditionals */}
           <div className='error'>
           {/* {hasSubmitted && validationErrors.question && `* ${validationErrors.question}`} */}
           </div>


           <button onClick={onSubmit}>Submit</button>
       </form>
     </div>
   )
}


export default QuestionForm;
