const LOAD_ALL_QUESTIONS = "questions/loadAllQuestions";
const LOAD_ONE_QUESTION = 'questions/loadOneQuestion'

const loadAllQuestions = (allQuestions) => {
  return {
    type: LOAD_ALL_QUESTIONS,
    allQuestions: allQuestions
  };
};

const loadOneQuestion = (question) => {
  return {
    type: LOAD_ONE_QUESTION,
    question
  }
}


export const thunkGetAllQuestions = () => async (dispatch) => {
  //GET /api/Questions
  console.log("before fetch")
  const res = await fetch("/api/questions");
  console.log("after fetch")
  if (res.ok) {
    //{ Questions: [ {}, {}, ... ]}
    const allQuestions = await res.json();
    console.log("allQuestions", allQuestions)
    dispatch(loadAllQuestions(allQuestions));
    return allQuestions;
  } else {
    console.log('/api/questions error output');
  }
};

export const thunkGetOneQuestion = (id) => async (dispatch) => {
  console.log("before fetch")
  const res = await fetch(`/api/questions/${id}`);
  console.log("after fetch")

  if (res.ok) {
    const questionDetails = await res.json()
    dispatch(loadOneQuestion(questionDetails))
    return questionDetails
  } else {
    console.log('/api/questions/:id error output')
  }
}


//reducer
const initialState = {};
let nextState

const questionsReducer = (state = initialState, action) => {
  // console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)
  switch (action.type) {
    case LOAD_ALL_QUESTIONS: {
      const newState = { ...initialState };
      console.log('action.allquestions', action.allQuestions)
      action.allQuestions.forEach((question) => newState[question.id] = question);
      // console.log('newState', newState);
      return newState;
    }
    case LOAD_ONE_QUESTION: {

      nextState = {...state, oneQuestion:null}
      nextState.oneQuestion={...action.question}
      return nextState
    }
    default:
      return state;
  }
};

export default questionsReducer;
