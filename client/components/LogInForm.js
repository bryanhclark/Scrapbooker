import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../store/user'


class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        this.props.handleSubmitDispatch(this.state, 'login')
    }
    render() {
        return (
            <div className='signup-Form-Container'>
                <h4>Login:</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input type='text' value={this.state.email} name='email' onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input type='text' value={this.state.password} name='password' onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='submit' />
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



const loginFormContainer = connect(mapState, mapDispatch)(LoginForm)

export default loginFormContainer









