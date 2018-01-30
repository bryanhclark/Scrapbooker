import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../store/user'
import { createEvent } from '../store/events'

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
                    <label>
                        Name:
                        <input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
                    </label>
                    <label>
                        Street:
                        <input type='text' value={this.state.street} name='street' onChange={this.handleChange} />
                    </label>
                    <label>
                        City:
                        <input type='text' value={this.state.city} name='city' onChange={this.handleChange} />
                    </label>
                    <label>
                        State:
                        <input type='text' value={this.state.state} name='state' onChange={this.handleChange} />
                    </label>
                    <label>
                        Zip:
                        <input type='text' value={this.state.zip} name='zip' onChange={this.handleChange} />
                    </label>
                    <label>
                        Start Time:
                        <input type='text' value={this.state.startTime} name='startTime' onChange={this.handleChange} />
                    </label>
                    <label>
                        End Time:
                        <input type='text' value={this.state.endTime} name='endTime' onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='submit' />
                </form>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        handleSubmitDispatch() {

        }
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmitDispatch(eventObj) {
            dispatch(createEvent(eventObj))
        }
    }
}


const createEventFormContainer = connect(mapState, mapDispatch)(CreateEventForm)

export default createEventFormContainer