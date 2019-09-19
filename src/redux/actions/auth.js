import { cav } from 'klaytn/caver'
import LectureEvaluationContract from 'klaytn/LectureEvaluationContract'
import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
  SIGNUP,
} from './actionTypes'

export const integrateWallet = (privateKey) => (dispatch) => {
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)
  cav.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address,
    },
  })
}

export const removeWallet = () => (dispatch) => {
  cav.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  return dispatch({
    type: REMOVE_WALLET,
  })
}

export const signup = (privateKey, email) => (dispatch) => {
  dispatch(integrateWallet(privateKey))
  LectureEvaluationContract.methods.addUser(privateKey, email).call()
  return dispatch({
    type: SIGNUP,
  })
}

export const login = (privateKey) => (dispatch) => {
  dispatch(integrateWallet(privateKey))
  // KlaystagramContract.methods.findUser(privateKey).call()
  LectureEvaluationContract.methods.findUser(privateKey).call()
    .then((isPresent) => {
      if(isPresent) {
        return dispatch({
          type: LOGIN,
        })
      }
    })
}

export const logout = () => (dispatch) => {
  dispatch(removeWallet())
  return dispatch({
    type: LOGOUT,
  })
}

