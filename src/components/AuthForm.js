import React, { Component } from 'react'
import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'

import './AuthForm.scss'

class AuthForm extends Component {
  state = {
    loginForm: true,
  }

  toggleForm = () => this.setState({
    loginForm: !this.state.loginForm,
  })

  render() {
    const { loginForm } = this.state
    return (
      <div className="AuthForm">
        <h2 className="AuthForm__h2">
          Klaytn-based<br />
          Lecture-Evaluation System
        </h2>
        <h1 className="AuthForm__h1">
          강평강평
        </h1>
        {loginForm ? <LoginForm /> : <SignupForm />}
        <p className="AuthForm__message">
          {loginForm ? 'Don\'t have an account? ' : 'Have an account? '}
          <span className="AuthForm__link" onClick={this.toggleForm}>
            {loginForm ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    )
  }
}

export default AuthForm
