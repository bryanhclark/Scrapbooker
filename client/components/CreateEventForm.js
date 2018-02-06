import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../store/currentEvents'

class CreateEventForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			street: '',
			city: '',
			state: '',
			zip: '',
			startTime: '',
			endTime: '',
			organizerId: this.props.user.id
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
			<div className='create-Event-Form-Container'>
        <h4 className='modal_header'>Create Event</h4>
				<form onSubmit={this.handleSubmit}>
					<div className='form_row'> 
						<label>Name:</label>
						<input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>Street:</label>
						<input type='text' value={this.state.street} name='street' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>City:</label>
						<input type='text' value={this.state.city} name='city' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>State:</label>
						<input type='text' value={this.state.state} name='state' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>Zip:</label>
						<input type='text' value={this.state.zip} name='zip' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>Start Time:</label>
						<input type='text' value={this.state.startTime} name='startTime' onChange={this.handleChange} />
					</div>
					<div className='form_row'>
						<label>End Time:</label>
						<input type='text' value={this.state.endTime} name='endTime' onChange={this.handleChange} />
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
	}
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		handleSubmitDispatch(eventObj) {
			dispatch(createEvent(eventObj))
			ownProps.show('events')
		}
	}
}


const createEventFormContainer = connect(mapState, mapDispatch)(CreateEventForm)

export default createEventFormContainer
