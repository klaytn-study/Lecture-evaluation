import { GET_EVAL } from 'redux/actions/actionTypes'

const initialState = {
  eval: null,
}

const evalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVAL:
      return {
        eval: action.payload.eval,
      }
    // case SET_FEED:
    //   return {
    //     // ...state,
    //     // eval: action.payload.feed,
    //   }
    default:
      return state;
  }
}

export default evalReducer
