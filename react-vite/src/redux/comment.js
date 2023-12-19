const LOAD_USER_COMMENTS = '/comments/loadUserComments'

const loadUserComments = (userComments) => {
  return {
    type: LOAD_USER_COMMENTS,
    userComments
  }
}

export const getCurrentComments = () => async (dispatch) => {
  const res = await fetch('/api/comments/current')

  if (res.ok) {
    const userComments = await res.json()
    dispatch(loadUserComments(userComments))
    return userComments
  }
}


const initialState = {}
// let newState

const commentsReducer = (state= initialState, action) => {
    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)
    // let comments
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
      default:
        return state;
    }
}


export default commentsReducer
