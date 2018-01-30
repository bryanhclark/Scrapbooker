import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import NavModal from './NavModal'

class NavLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
        }
        this.toggleNavModal = this.toggleNavModal.bind(this)
    }

    toggleNavModal = () => {
        this.setState({
            isNavModalOpen: !this.state.isNavModalOpen
        })
    }

    render() {
        return (
            <div className='navBarLoginButtonContainer' >
                <ul className='navBarButtonList'>
                    <NavLink to='/'><li className='navbarButton'>Home</li></NavLink>
                    <div className='loginModalContainer'>
                        <li className='navbarButton'><a onClick={this.toggleNavModal}>Login</a></li>
                        <NavModal show={this.state.isNavModalOpen}
                            onClose={this.toggleNavModal}>
                            Login Modal
                        </NavModal>
                    </div>
                    <div className='signUpModalContainer'>
                        <li className='navbarButton'><a onClick={this.toggleNavModal}>Sign Up</a></li>
                        <NavModal show={this.state.isNavModalOpen}
                            onClose={this.toggleNavModal}>
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