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
				<div className="wrapper">
					<h1 id="greeting">Welcome to Scrappr ... <br />a collaborative, real-time scrapbooking app for events.</h1>
				</div>
			</div>
		)
	}
}


export default Home
