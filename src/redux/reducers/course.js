import { SET_COURSE } from 'redux/actions/actionTypes'

const initialState = {
    course: null,
}

const courseReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_COURSE :
            return{
                ...state,
                course: action.payload.course,
            }
        default:
            return state;
    }
}

export default courseReducer;