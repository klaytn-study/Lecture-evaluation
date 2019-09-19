export default function(state = null, action) {
  switch(action.type) {
  case 'LECTURE_SELECTED':
    return action.payload;
  }
  return state;
}

