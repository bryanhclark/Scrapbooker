import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { NavModal, SignUpForm, LoginForm } from './index'

class NavLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoginModalOpen: false,
            isSignupModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }


    toggleModal = (name) => {
        if (name === 'login') this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen })
        else if (name === 'signup') this.setState({ isSignupModalOpen: !this.state.isSignupModalOpen })
    }

    render() {
        return (
            <div className='navBarLoginButtonContainer' >
                <ul className='navBarButtonList'>
                    <NavLink to='/'><li className='navbarButton'>Home</li></NavLink>
                    <div className='loginModalContainer'>
                        <li className='navbarButton'><a onClick={() => this.toggleModal('login')}>Login</a></li>
                        <NavModal show={this.state.isLoginModalOpen}
                            onClose={() => this.toggleModal('login')}>
                            <LoginForm />
                        </NavModal>
                    </div>
                    <div className='signUpModalContainer'>
                        <li className='navbarButton'><a onClick={() => this.toggleModal('signup')}>Sign Up</a></li>
                        <NavModal show={this.state.isSignupModalOpen}
                            onClose={() => this.toggleModal('signup')}>
                            <SignUpForm />
                        </NavModal>
                    </div>
                    <a href='/auth/google'><li className='navbarButton'>Google+</li></a>
                </ul>
            </div>
        )
    }
}


export default NavLogin;