import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { NavModal, SignUpForm, LoginForm } from './index'



class Home extends Component {
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
			<div id='homeContainer'>
				<div className="wrapper">
					<h1 id="greeting"><span id="headline">Welcome to <span id="greeting_logo">Scrappr</span></span>a collaborative, real-time scrapbooking manager ... for events, happenings, and life.</h1>
					<div id="home_btn_area">
						<div id="home_btns">
							<div id="btn_signup">
								<a className="btn home_btn" onClick={() => this.toggleModal('signup')}>Sign Up</a>
								<NavModal show={this.state.isSignupModalOpen}
									onClose={() => this.toggleModal('signup')}>
									<SignUpForm />
								</NavModal>
							</div>
							<div id="btn_login">
								<a className="btn home_btn" onClick={() => this.toggleModal('login')}>Login</a>
								<NavModal show={this.state.isLoginModalOpen}
									onClose={() => this.toggleModal('login')}>
									<LoginForm />
								</NavModal>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Home
