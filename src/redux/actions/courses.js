import LectureEvaluationContract from 'klaytn/LectureEvaluationContract'
import { courseParser } from 'utils/misc'
import { SET_COURSE } from './actionTypes'

const setCourse = (course) => ({
    type: SET_COURSE,
    payload: { course },
  })

export const getCourse = () => (dispatch) => {
    LectureEvaluationContract.methods.getCourseNum().call()
      .then((courseNum) => {
        if (!courseNum) return []
        const courses = []
        for (let i = 0; i < courseNum; i++) {
          const course = LectureEvaluationContract.methods.getCourse(i).call()
          courses.push(course)
        }
        return Promise.all(courses)
      })
      .then((courses) => dispatch(setCourse(courseParser(courses))))
}

