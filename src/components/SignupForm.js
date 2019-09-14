import React, { Component } from 'react'
import { cav } from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
// import { sendEmail } from 'utils/auth'

import './SignupForm.scss'

class SignupForm extends Component {
  state = {
    privateKey: null,
    email: '',
    emailValid: 0, // 발송되는 코드
    userInput: 0, // 유저가 input하는 코드
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
  handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.number) === this.state.answer) {
      // disabled = "false"
      alert('인증되셨습니다')
    } else{
      alert('인증코드를 다시 확인해주세요')
    }
  }

  render() {
    // button에 type를 추가시켜서 form형태로 정보를 전송시킬순 없는건가..?
    // 해봤는데 form형태로 전송안시켜도 확인되더라 ㄱㅊㄱㅊ음!
    const { email, userInput, privateKey } = this.state
    return (
      <div className="SignupForm">
        <Input
          className="SignupForm__input"
          placeholder="Generate Private Key to Sign up"
          value={privateKey || ''}
          label="Private key"
          readOnly
        />
        <Input
          className="SignupForm__inputEmail"
          placeholder="Please enter your Email"
          value={email || ''}
          onChange={this.handleEmailChange}
          label="Email"
        />

        <Input
          className="SignupForm__UserInput"
          placeholder="Please enter your verification code"
          value={userInput || ''}
          onChange ={this.handleECodeChange}
          label="UserInput"
        />

        <Button
          className="SignupForm__SendCode"
          title="Send Verification Code"
          onClick= {this.handleClick}
        />

        <Button
          className="SignupForm__CheckCode"
          title="Check Code"
          onClick ={this.handleSubmit}
        />

        <Button
          className="SignupForm__Final"
          title="Sign in"
          onClick={this.generatePrivateKey}
          disabled="true"
        />


      </div>
    )
  }
}

export default SignupForm
