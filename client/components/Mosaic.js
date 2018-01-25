import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'




class Mosaic extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className='mosaicContainer'>
                <h3>This is the mosaic component</h3>
                <NavLink to='/'>Home</NavLink>
            </div>
        )
    }
}


export default Mosaic