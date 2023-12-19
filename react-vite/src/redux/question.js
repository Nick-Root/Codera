const LOAD_ALL_QUESTIONS = "questions/loadAllQuestions";
const LOAD_ONE_QUESTION = 'questions/loadOneQuestion'
const LOAD_USER_QUESTIONS = '/questions/loadUserQuestions'
const LOAD_SAVED_QUESTIONS = "questions/loadSavedQuestions";
const DELETE_SAVED_QUESTION = "questions/deleteSavedQuestion"
const ADD_SAVED_QUESTION = "questions/addSavedQuestion"
const RECEIVE_ONE_QUESTION = "questions/receiveOneQuestion"



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

const deleteSavedQuestion = (questionId) => ({
  type: DELETE_SAVED_QUESTION,
  questionId
})

const addSavedQuestion = (question) => {
  return {
    type: ADD_SAVED_QUESTION,
    question
  }
}

const receiveOneQuestion = (question) => {
  return {
    type: RECEIVE_ONE_QUESTION,
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

export const thunkFetchRemoveSavedQuestion = (questionId) => async (dispatch) => {
  const res = await fetch(`/api/savedQuestions/${questionId}/remove`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" },
  })

  if (res.ok) {
    dispatch(deleteSavedQuestion(questionId))
  }
  return questionId
}

export const thunkFetchAddSavedQuestion = (question, questionId) => async (dispatch) => {
  const res = await fetch(`/api/savedQuestions/${questionId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question)
  })

  if (res.ok) {
    const question = await res.json();
    dispatch(addSavedQuestion(question));
    return question;
  }
}


//dataObj {question: question, topicId: topicId}
export const thunkPostOneQuestion = (dataObj) => async (dispatch) => {
  //should go inside the database
  //console.log("before POST");
  const res = await fetch(`/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObj)
  });
  //console.log("after POST");


  if(res.ok) {
    console.log("post res.ok")
    const newQuestion = await res.json();  //now the Question should have a id created from the backend
    console.log("thunk newQuestion", newQuestion)
    dispatch(receiveOneQuestion(newQuestion));  //receiveQuestion adds the data, as seen in the reducer
    return newQuestion;
  } else {
    console.log('status code:', res.status)
    console.log("POST error message")
    const error = await res.json();
    console.log('error', error)
    return error;
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
    case RECEIVE_ONE_QUESTION: {
      const newState = { ...state, [action.question.id]: action.question }
      return newState
    }
    case LOAD_SAVED_QUESTIONS: {
      const newState = { ...initialState };
      action.allQuestions.forEach((question) => newState[question.id] = question);
      return newState;
    }
    case DELETE_SAVED_QUESTION: {
      let newState = { ...state };
      delete newState[action.questionId];
      return newState;
    }
    case ADD_SAVED_QUESTION:
      return { ...state, [action.question.id]: action.question };
    default:
      return state;
  }
};

export default questionsReducer;
