import React, { Component } from 'react'
import { cav } from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import { sendEmail } from 'utils/auth'

import './SignupForm.scss'

class SignupForm extends Component {
  state = {
    privateKey: null,
    email: '',
    emailValid: 0,
  }
 
  generatePrivateKey = () => {
    const { privateKey } = cav.klay.accounts.create()
    this.setState({ privateKey })
  }

  inputEmail = (e) => {
    this.setState({ 
      email: e.target.value
    })
  }

  inputEmailValid = (e) => {
    this.setState({ 
      [e.target.emailValid]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    })
  }


  render() {
    const { privateKey } = this.state.privateKey
    if (this.state.emailValid != number){
      button = <Button
          className="SignupForm__button"
          title="Generate Private key"
          onClick={this.generatePrivateKey}
        />
    }else{
      console.log("Check your email")

    }



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
          onChange={this.inputEmail}
          label="Email"
          readOnly
        />

        <Input
          className="SignupForm__EmailAuth"
          placeholder="Please enter your verification code"
          value={emailValid || ''}
          onChange = {this.inputEmaiValid}
          label="EmailAuth"
          readOnly
        />

        <Button
          className="SignupForm__EmailAuth"
          title="EmailAuth"
          onClick = {sendEmail(this.state.email)}
        />


        {button}

      </div>
    )
  }
}

export default SignupForm
