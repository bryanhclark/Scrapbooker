import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import NavModal from './NavModal'

class NavLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginModalOpen: false,
            isSignupModalOpen: false
        }
        this.toggleLoginModal = this.toggleLoginModal.bind(this)
        this.toggleSignUpModal = this.toggleSignUpModal.bind(this)
    }

    toggleLoginModal = () => {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        })

    }
    toggleSignUpModal = () => {
        this.setState({
            isSignupModalOpen: !this.state.isSignupModalOpen
        })

    }

    render() {
        return (
            <div className='navBarLoginButtonContainer' >
                <ul className='navBarButtonList'>
                    <NavLink to='/'><li className='navbarButton'>Home</li></NavLink>
                    <div className='loginModalContainer'>
                        <li className='navbarButton'><a onClick={this.toggleLoginModal}>Login</a></li>
                        <NavModal show={this.state.isLoginModalOpen}
                            onClose={this.toggleLoginModal}>
                            This should be login
                        </NavModal>
                    </div>
                    <div className='signUpModalContainer'>
                        <li className='navbarButton'><a onClick={this.toggleSignUpModal}>Sign Up</a></li>
                        <NavModal show={this.state.isSignupModalOpen}
                            onClose={this.toggleSignUpModal}>
                            Sign Up
                        </NavModal>
                    </div>
                    <a href='/auth/google'><li className='navbarButton'>Google+</li></a>

                </ul>
            </div>
        )
    }
}


export default NavLogin;