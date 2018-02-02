import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../store/user'


class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    e.preventDefault()
    let change = {}
    change[e.target.name] = e.target.value

    this.setState(change)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmitDispatch(this.state, 'signup')
  }
  render() {
    return (
      <div className='signup-Form-Container'>
        <form onSubmit={this.handleSubmit}>
          <div className='signup-firstName--Button-Div'>
            <label>
              First Name:
                <input type='text' value={this.state.firstName} name='firstName' onChange={this.handleChange} />
            </label>
          </div>
          <div className='signup-lastNamr-submit-Button-Div'>
            <label>
              Last Name:
                <input type='text' value={this.state.lastName} name='lastName' onChange={this.handleChange} />
            </label>
          </div>
          <div className='signup-email-submit-Button-Div'>
            <label>
              Email:
                <input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
            </label>
          </div>
          <div className='signup-password-submit-Button-Div'>
            <label>
              Password:
                <input type='text' value={this.state.password} name='password' onChange={this.handleChange} />
            </label>
          </div>
          <div className='btn_area'>
            <input className="btn" type='submit' value='submit' />
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmitDispatch(userObj, method) {
      console.log(userObj);
      dispatch(auth(userObj, method))
    }
  }
}



const signUpFormContainer = connect(mapState, mapDispatch)(SignUpForm)

export default signUpFormContainer









