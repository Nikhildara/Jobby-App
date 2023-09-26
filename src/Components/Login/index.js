import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: '', showErr: false}

  toCookies = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 6})
    history.replace('/')
  }

  submitDetailsToApi = async loginDetails => {
    // const {loginDetails} = this.state
    console.log(loginDetails)

    const API = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(API, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jwtToken = data.jwt_token
      this.toCookies(jwtToken)
    }
    if (response.ok === false) {
      const data = await response.json()
      console.log(data)
      const errMsg = data.error_msg
      this.setState({showErr: true, errMsg})
    }
  }

  userInput = e => {
    this.setState({username: e.target.value})
  }

  passwordInput = e => {
    this.setState({password: e.target.value})
  }

  submitForm = e => {
    const {username, password} = this.state
    e.preventDefault()
    const loginDetails = {
      username,
      password,
    }
    this.setState({username: '', password: '', showErr: false})
    this.submitDetailsToApi(loginDetails)
  }

  render() {
    const {username, password, showErr, errMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-img"
          />
          <form className="form" onSubmit={this.submitForm}>
            <div className="input-con">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Username"
                className="input"
                onChange={this.userInput}
              />
            </div>
            <div className="input-con">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                className="input"
                onChange={this.passwordInput}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {showErr && <p className="errMsg">*{errMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
