const LOAD_ALL_QUESTIONS = "spots/loadAllQuestions";


const loadAllQuestions = (allQuestions) => {
    return {
      type: LOAD_ALL_QUESTIONS,
      allQuestion: allQuestions
   };
};


export const thunkGetAllQuestions = () => async (dispatch) => {
    //GET /api/Questions
    console.log("before fetch")
    const res = await fetch("/api/questions");
    console.log("after fetch")
    if(res.ok) {
      //{ Questions: [ {}, {}, ... ]}
      const allQuestions = await res.json();
      console.log("allQuestions", allQuestions)
      dispatch(loadAllQuestions(allQuestions));
      return allQuestions;
    } else  {
      console.log('/api/questions error output');
  }
};


//reducer
const initialState = {};

const questionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ALL_QUESTIONS: {
        const newState = { ...initialState };
        //console.log('action.allquestions', action.allquestions)
        //action.allquestions.questions.forEach((spot) => newState[spot.id] = spot);
        //console.log('newState', newState);
        return newState;
      }
      default:
        return state;
    }
  };

  export default questionsReducer;
