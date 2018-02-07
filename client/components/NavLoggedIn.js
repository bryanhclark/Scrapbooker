import React from 'react'
import { NavLink } from 'react-router-dom'


const NavLoggedIn = (props) => (
    <div className='navBarLoggedInButtonContainer'>
        <ul className='navBarButtonList'>
            <NavLink to={`/dashboard/${props.user.userHash}`}><li className='navbarButton'>Dashboard</li></NavLink>
            <li onClick={props.logoutUser}>Logout</li>
        </ul>
    </div>
)

export default NavLoggedIn