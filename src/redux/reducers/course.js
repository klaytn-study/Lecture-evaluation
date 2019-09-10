const initialState = {
    name: null,
}

const courseReducer = (state = initialState, action) => {
    switch(action.type){
        case SEARCH :
            return{
                ...state,
                name: action.payload.name,
            }
        default:
            return state;
    }
}

//export default courseReducer;