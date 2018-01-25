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
            </div>
        )
    }
}


export default Home