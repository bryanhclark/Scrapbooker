import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'
import NavLogin from './NavLogin'
import NavLoggedIn from './NavLoggedIn'
import { logout } from '../store/user'



class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav>
                <div className='navBarContainer'>
                    <div className='navBarHeader'>
                        <NavLink to='/'><h1>Gathr.io</h1></NavLink>
                    </div>
                    {this.props.user.id ? <NavLoggedIn user={this.props.user} logoutUser={this.props.logoutUser} /> : <NavLogin />}
                </div>
            </nav>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}


const mapDispatch = (dispatch) => {
    return {
        logoutUser() {
            dispatch(logout())
        }
    }
}


const navbarContainer = connect(mapState, mapDispatch)(Navbar)

export default navbarContainer