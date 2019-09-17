export function selectLecture(lecture) {
  return {
    type: 'LECTURE_SELECTED',
    payload: lecture
  };
}

