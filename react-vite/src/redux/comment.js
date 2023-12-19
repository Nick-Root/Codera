const LOAD_USER_COMMENTS = '/comments/loadUserComments'
const POST_COMMENT = '/comments/postComment'

const loadUserComments = (userComments) => {
  return {
    type: LOAD_USER_COMMENTS,
    userComments
  }
}

const postComment = (comment) => ({
  type: POST_COMMENT,
  comment,
});


export const getCurrentComments = () => async (dispatch) => {
  const res = await fetch('/api/comments/current')

  if (res.ok) {
    const userComments = await res.json()
    dispatch(loadUserComments(userComments))
    return userComments
  }
}

export const thunkPostComment = (questionId, commentData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/questions/${questionId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const comment = await res.json();
      dispatch(postComment(comment));
      return comment;
    } else {
      console.log('Error posting comment:', res.status);
    }
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};

const initialState = {
  comments: []
}


const commentsReducer = (state= initialState, action) => {
    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)

    switch (action.type) {
      case LOAD_USER_COMMENTS: {
      const newState = { ...state };
      newState.user = action.userComments.user;
      newState.userComments = action.userComments.comments.map((comment) => ({
        comment: comment.comment,
        createdAt: comment.createdAt
      }))
      return newState;
      }
      case POST_COMMENT:
        return {
          ...state,
          comments: [...state.comments, action.comment],
        };
      default:
        return state;
    }
}


export default commentsReducer
