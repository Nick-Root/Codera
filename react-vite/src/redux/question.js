const LOAD_ALL_QUESTIONS = "questions/loadAllQuestions";
const LOAD_ONE_QUESTION = 'questions/loadOneQuestion'
const LOAD_USER_QUESTIONS = '/questions/loadUserQuestions'
const LOAD_SAVED_QUESTIONS = "questions/loadSavedQuestions";

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

const loadUserQuestions = (userQuestions) => {
  return {
    type: LOAD_USER_QUESTIONS,
    userQuestions: userQuestions
  }
}

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

export const getCurrentQuestions = () => async (dispatch) => {
  const res = await fetch('/api/questions/current')

  if (res.ok) {
    const userQuestions = await res.json()
    console.log("USER QUESTIONS", userQuestions)
    dispatch(loadUserQuestions(userQuestions))
    console.log("USER QUESTIONS", userQuestions)
    return userQuestions
  }
}

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

      nextState = { ...state, oneQuestion: null }
      nextState.oneQuestion = { ...action.question }
      return nextState
    }
    case LOAD_USER_QUESTIONS: {
      const newState = { ...state };
      newState.user = action.userQuestions.user;
      newState.userQuestions = action.userQuestions.questions.map((question) => ({
        question: question.question,
        createdAt: question.createdAt
      }))
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
