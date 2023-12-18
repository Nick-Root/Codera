const LOAD_ALL_TOPICS = "topics/loadAllTopics";
const LOAD_SINGLE_TOPICS = "topics/loadSingleTopics";


const loadAllTopcis = (topics) => {
  return {
    type: LOAD_ALL_TOPICS,
    topics
  };
};

const loadSingleTopcis = (topic) => {
    return {
      type: LOAD_SINGLE_TOPICS,
      topic
    };
  };


export const thunkGetAllTopics = () => async (dispatch) => {
  //GET /api/Questions
  const res = await fetch("/api/topics");
  if (res.ok) {
    const allTopics = await res.json();
    dispatch(loadAllTopcis(allTopics));
    return allTopics;
  } else {
    console.log('/api/topics error output');
  }
};

export const thunkGetSingleTopic = (topicId) => async (dispatch) => {
    //GET /api/Questions
    const res = await fetch(`/api/topics/${topicId}`);
    if (res.ok) {
      const topic = await res.json();
      dispatch(loadSingleTopcis(topic));
      return topic;
    } else {
      console.log(`/api/topics/${topicId} error output`);
    }
  };




  //reducer
  const initialState = {};

  const topicReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ALL_TOPICS:
          return { ...state, ...action.topics };
      case LOAD_SINGLE_TOPICS:
          return { ...state, ...action.topic };
      default:
        return state;
    }
};

export default topicReducer;
