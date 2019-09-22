import { GET_EVAL } from 'redux/actions/actionTypes'
import { SET_EVALUATION } from 'redux/actions/actionTypes'

const initialState = {
  evalu: null,
}

const evalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVAL:
      return {
        ...state,
        evaluD: action.payload.evaluD,
      }
    case SET_EVALUATION:
      return {
        ...state,
        evalu: action.payload.evalu,
      }
    default:
      return state;
  }
}
// import {
//   UPLOAD_GOOD,
//   UPLOAD_BAD
// } from 'redux/actions/actionTypes'

// const initialState = {
//   courseId: null,
//   evaluationId: null,
// }

// const evalReducer = (state = initialState, action) => {
//   switch(action.type){
//     case UPLOAD_GOOD: 
//       return {
//         ...state,
//       }
//     case UPLOAD_BAD: 
//       return {
//         ...state
//       }
//     default :
//       return state
export default evalReducer
