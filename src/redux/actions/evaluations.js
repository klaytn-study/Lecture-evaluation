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

export const uploadEvaluation = (courseId, content) => (dispatch) => {
  KlaystagramContract.methods.uploadEvaluation(courseId, content).send({
    from: getWallet().address,
    gas: '200000000',
  })
  .once('transactionHash', (txHash) => {
    ui.showToast({
      status: 'pending',
      message: `Sending a transaction... (uploadPhoto)`,
      txHash,
    })
  })
  .once('receipt', (receipt) => {
    ui.showToast({
      status: receipt.status ? 'success' : 'fail',
      message: `Received receipt! It means your transaction is
      in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
      link: receipt.transactionHash,
    })
    const tokenId = receipt.events.PhotoUploaded.returnValues[0]
    dispatch(updateFeed(tokenId))
  })
  .once('error', (error) => {
    ui.showToast({
      status: 'error',
      message: error.toString(),
    })
  })
}