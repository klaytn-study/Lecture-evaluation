export default function(state = null, action) {
  switch(action.type) {
  case 'LECTURE_SELECTED':
    console.log(action.payload);
    return action.payload;
  }
  return state;
}

