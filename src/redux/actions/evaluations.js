import KlaystagramContract from 'klaytn/KlaystagramContract'
import { getWallet } from 'utils/crypto'
import ui from 'utils/ui'
import { evaluationParser } from 'utils/misc'
import { SET_EVALUATION } from './actionTypes'

const setEvaluation = (course) => ({
    type: SET_EVALUATION,
    payload: { course },
  })

export const getEvaluation = (courseId) => (dispatch) => {
    course = KlaystagramContract.methods.getEvaluationNum(courseId).call()
      .then((evaluationNum) => {
        if (!evaluationNum) return []
        const evaluations = []
        for (let i = 0; i < evaluationNum; i++) {
          const evaluation = KlaystagramContract.getEvaluation(courseId, i).call()
          evaluations.push(evaluation)
        }
        return Promise.all(evaluations)
      })
      .then((evaluations) => dispatch(setEvaluation(evaluationParser(evaluations))))
}
