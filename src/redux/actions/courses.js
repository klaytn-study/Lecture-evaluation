import KlaystagramContract from 'klaytn/KlaystagramContract'
import { getWallet } from 'utils/crypto'
import ui from 'utils/ui'
import { courseParser } from 'utils/misc'
import { SET_COURSE } from './actionTypes'

const setCourse = (course) => ({
    type: SET_COURSE,
    payload: { course },
  })

export const getCourse = () => (dispatch) => {
    course = KlaystagramContract.methods.getCourseNum().call()
      .then((courseNum) => {
        if (!courseNum) return []
        const courses = []
        for (let i = 0; i < courseNum; i++) {
          const course = KlaystagramContract.getCourse(i).call()
          courses.push(course)
        }
        return Promise.all(courses)
      })
      .then((courses) => dispatch(setCourse(courseParser(courses))))
}

