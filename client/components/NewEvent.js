import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import { postEvent } from '../store'




const NewEvent = (props) => {
  //Destructure props
  const {handleSubmit} = props

        return (
            <div className='NewEventContainer'>
              <h2>EVENT CREATION</h2>
              <form id='new_event' onSubmit={handleSubmit}>
                <input id='name' placeholder='Event Name' />
                <input id='street' placeholder='Street' />
                <input id='city' placeholder='City' />
                <input id='state' placeholder='State' />
                <input id='zip' placeholder='Zip' />
                <input id='startTime' placeholder='Start Time' />
                <input id='endTime' placeholder='End Time' />
                <button>Submit</button>
              </form>
            </div>
        )
}

const mapStateToProps = function(state) {
  return {
    events: state.events
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleSubmit(event) {
      //Prevent page refresh
      event.preventDefault();
      //Target form
      const form = document.getElementById('new_event')
      //Build new event object
      const eventToAdd = {
        name: event.target.name.value,
        street: event.target.street.value,
        city: event.target.city.value,
        state: event.target.state.value,
        zip: event.target.zip.value,
        startTime: event.target.startTime.value,
        //endTime: event.target.endTime.value
      }
      //Dispatch thunk to add new event & reset the form
      dispatch(postEvent(eventToAdd))
      form.reset();
      //Redirect
      // ownProps.history.push('/students')
    }
  }
}

const NewEventContainter = connect(mapStateToProps, mapDispatchToProps)(NewEvent)
export default NewEventContainter;
