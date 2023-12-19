const LOAD_ALL_TOPICS = "topics/loadAllTopics";
const LOAD_SINGLE_TOPICS = "topics/loadSingleTopics";
const CREATE_TOPIC = "topics/createTopic"

const createTopic = (topic) => {
  return {
    type: CREATE_TOPIC,
    topic: topic,
  };
};

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



export const createTopicThunk = (topic) => async dispatch => {
  const res = await fetch("/api/topics/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(topic)
  })
  if (res.ok) {
    const newTopic = await res.json();
    console.log("json topic", newTopic)
    dispatch(createTopic(newTopic));
    return newTopic;
  } else {
    const errorData = await res.json().catch(() => null); // Attempt to read error data
    console.error('Error creating topic:', res.status, errorData);
  }
}


  //reducer
  const initialState = {};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_TOPICS:
      return { ...state, ...action.topics };
    case LOAD_SINGLE_TOPICS:
      return { ...state, ...action.topic };
    case CREATE_TOPIC:
      return { ...state, topics: [...state, action.topic], };
    default:
      return state;
  }
};

export default topicReducer;
