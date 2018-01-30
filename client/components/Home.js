import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'




class Home extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className='homeContainer'>
                <h3>Home Component</h3>
                <NavLink to='/mosaic'>Mosaic</NavLink>
                <br/>
                <NavLink to='/newEvent'>Create an Event</NavLink>
                <br/>
                <NavLink to='/upload'>Upload Photo</NavLink>
            </div>
        )
    }
}


export default Home
