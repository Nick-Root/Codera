



const initialState = {}
let nextState

const commentsReducer = (state= initialState, action) => {
    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)
    // let comments
    switch (action.type) {
      case LOAD_COMMENTS: {

      }
      default:
        return state;
    }
}


export default commentsReducer
