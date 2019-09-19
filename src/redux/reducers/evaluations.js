import {
  UPLOAD_GOOD,
  UPLOAD_BAD
} from 'redux/actions/actionTypes'

const initialState = {
  courseId: null,
  evaluationId: null,
}

const evalReducer = (state = initialState, action) => {
  switch(action.type){
    case UPLOAD_GOOD: 
      return {
        ...state,
      }
    case UPLOAD_BAD : 
      return {
        ...state
      }
    default :
      return state 
  }
}

export default evalReducer
