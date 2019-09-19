import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import ui from './ui'
import photos from './photos'
import courses from './course'
import evaluations from './evaluations'

const reducer = combineReducers({
  routing: routerReducer,
  auth,
  ui,
  photos,
  courses,
  evaluations,
})

export default reducer;
