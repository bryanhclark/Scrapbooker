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
				<form onSubmit={this.handleSubmit}>
					<div className='create-Event-Name-Button-Div'>
						<label>
							Name:
              <input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-Street-Button-Div'>
						<label>
							Street:
              <input type='text' value={this.state.street} name='street' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-City-Button-Div'>
						<label>
							City:
              <input type='text' value={this.state.city} name='city' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-State-Button-Div'>
						<label>
							State:
               <input type='text' value={this.state.state} name='state' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-Zip-Button-Div'>
						<label>
							Zip:
               <input type='text' value={this.state.zip} name='zip' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-startTime-Button-Div'>
						<label>
							Start Time:
              <input type='text' value={this.state.startTime} name='startTime' onChange={this.handleChange} />
						</label>
					</div>
					<div className='create-Event-startTime-Button-Div'>
						<label>
							End Time:
              <input type='text' value={this.state.endTime} name='endTime' onChange={this.handleChange} />
						</label>
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
