import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import ui from './ui'
import courses from './course'
import evaluations from './evaluations'
import lectures from './lectures_reducer';
import selected from './selected_reducer';

const reducer = combineReducers({
  routing: routerReducer,
  auth,
  ui,
  courses,
  lectures,
  selected,
  evaluations,
})

export default reducer;
