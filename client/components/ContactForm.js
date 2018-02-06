import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createContact } from '../store/contacts'




class ContactForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone: '',
			organizerId: this.props.user.id
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {

	}

	handleChange(e) {
		e.preventDefault()
		let change = {}
		change[e.target.name] = e.target.value
		this.setState(change)
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.handleSubmitDispatch(this.state)
	}

	render() {
		return (
			<div className='create-Contact-Form-Container'>
			  <h4 className='modal_header'>Create Event</h4>
				<form onSubmit={this.handleSubmit}>
					<div className='form_row'>
						<label>Name:</label>
						<input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>Phone Number:</label>
						<input type='text' value={this.state.phone} name='phone' onChange={this.handleChange} />	
					</div>
					<div className='btn_area'>
						<input className="btn" type='submit' value='submit' />
					</div>
				</form>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		user: state.user,
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		handleSubmitDispatch(contactObj) {
      dispatch(createContact(contactObj))
      ownProps.show('contacts')
		}
	}
}

const createContactFormContainer = connect(mapState, mapDispatch)(ContactForm)

export default createContactFormContainer
