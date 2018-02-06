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
        <h4 className='modal_header'>Sign Up:</h4>
        <form onSubmit={this.handleSubmit}>
          <div className='form_row'>
            <label>First Name</label>
            <input type='text' value={this.state.firstName} name='firstName' onChange={this.handleChange} />
          </div>
          <div className='form_row'>
            <label>Last Name</label>
            <input type='text' value={this.state.lastName} name='lastName' onChange={this.handleChange} />
          </div>
          <div className='form_row'>
            <label>Email</label>
            <input type='text' placeholder="" value={this.state.email} name='email' onChange={this.handleChange} />
          </div>
          <div className='form_row'>
            <label>Password</label>
            <input type='text' value={this.state.password} name='password' onChange={this.handleChange} />
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
