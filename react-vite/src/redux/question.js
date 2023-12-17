const LOAD_ALL_QUESTIONS = "questions/loadAllQuestions";
const LOAD_SAVED_QUESTIONS = "questions/loadSavedQuestions";


const loadAllQuestions = (allQuestions) => {
  return {
    type: LOAD_ALL_QUESTIONS,
    allQuestions: allQuestions
  };
};

const loadSavedQuestions = (allQuestions) => {
  return {
    type: LOAD_SAVED_QUESTIONS,
    allQuestions: allQuestions
  };
};


export const thunkGetAllQuestions = () => async (dispatch) => {
  //GET /api/Questions
  console.log("before fetch")
  const res = await fetch("/api/questions");
  console.log("after fetch")
  if (res.ok) {
    //{ Questions: [ {}, {}, ... ]}
    const allQuestions = await res.json();
    dispatch(loadAllQuestions(allQuestions));
    return allQuestions;
  } else {
    console.log('/api/questions error output');
  }
};

export const thunkGetSavedQuestions = () => async (dispatch) => {
  //GET /api/Questions
  const res = await fetch("/api/savedQuestions");
  if (res.ok) {
    const allQuestions = await res.json();
    dispatch(loadSavedQuestions(allQuestions));
    return allQuestions;
  } else {
    console.log('/api/questions error output');
  }
};


//reducer
const initialState = {};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_QUESTIONS: {
      const newState = { ...initialState };
      action.allQuestions.forEach((question) => newState[question.id] = question);
      // console.log('newState', newState);
      return newState;
    } 
    case LOAD_SAVED_QUESTIONS: {
      const newState = { ...initialState };
      action.allQuestions.forEach((question) => newState[question.id] = question);
      return newState;
    }
    default:
      return state;
  }
};

export default questionsReducer;
