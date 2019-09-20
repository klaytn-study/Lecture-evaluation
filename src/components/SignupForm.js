import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cav } from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import { signup } from '../redux/actions/auth'

import './SignupForm.scss'

class SignupForm extends Component {
  state = {
    privateKey: null,
    email: '',
    emailValid: 0, // 발송되는 코드
    userInput: 0, // 유저가 input하는 코드
    disabledButton: true,
  }

  // 최종적으로 실행되어야 하는 것
  generatePrivateKey = () => {
    const { privateKey } = cav.klay.accounts.create()
    this.setState({ privateKey })
  }

  // 이메일로 코드 전송&코드 상태 반영
  handleClick = () => {
    // const num = sendEmail(email)
    alert('Verification code is sent to your email address')
    this.setState({
      emailValid: num,
    })
    
  }

  // 입력 이메일 상태 실시간으로 반영
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  // 사용자가 입력하는 코드 상태 실시간으로 반영
  handleECodeChange = (e) => {
    this.setState({
      userInput: e.target.value,
    })
  }

  // 사용자가 코드확인 클릭 시 코드가 맞는지 확인
  handleFinalSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.number) === this.state.answer) {
      // disabled = "false"
      alert('인증되셨습니다')
      this.setState({
        disabledButton: false,
      })
    } else{
      alert('인증코드를 다시 확인해주세요')
      this.setState({
        disabledButton: false,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { privateKey, email } = this.state
    this.props.signup(privateKey, email)
    console.log('성공~~~')
  }


  render() {
    // button에 type를 추가시켜서 form형태로 정보를 전송시킬순 없는건가..?
    // 해봤는데 form형태로 전송안시켜도 확인되더라 ㄱㅊㄱㅊ음!
    const { email, userInput, privateKey } = this.state
    return (
      <div className="SignupForm">
        <div className="row">
          <div className="col-9">
            <Input
              className="SignupForm__inputEmail"
              placeholder="Please enter your Email"
              value={email || ''}
              onChange={this.handleEmailChange}
              label="Email"
            />
          </div>
          <div className="col-3">
            <Button
              className="SignupForm__SendCode"
              title="인증코드 전송"
              onClick={this.handleClick}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Input
              className="SignupForm__UserInput"
              placeholder="Please enter your verification code"
              value={userInput || ''}
              onChange={this.handleECodeChange}
              label="UserInput"
            />
          </div>
          <div className="col-3">
            <Button
              className="SignupForm__CheckCode"
              title="인증코드 확인"
              onClick ={this.handleFinalSubmit}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Input
              className="SignupForm__input"
              placeholder="Generate Private Key to Sign up"
              value={privateKey || ''}
              label="Private key"
              readOnly
            />
          </div>
          <div className="col-3">
            <Button
              className="SignupForm__Final"
              title="PK생성"
              onClick={this.generatePrivateKey}
              disabled={this.state.disabledButton}
            />
          </div>
        </div>
        <Button
          className="Signup"
          title="회원가입"
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (privateKey, email) =>
    dispatch(signup(privateKey, email)),
})

export default connect(null, mapDispatchToProps)(SignupForm)
