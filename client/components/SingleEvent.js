import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchPartipants } from '../store/participants'
import { DashboardModal, ContactList, AddContactsToEventForm } from './index'
import { NavLink } from 'react-router-dom'
import {broadcastTextMessage} from '../store/twilio'



class SingleEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddContactModelOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.props.loadEvent(this.props.match.params.eventId)
  }

  toggleModal = (name) => {
    if (name === 'addContacts') this.setState({ isAddContactModelOpen: !this.state.isAddContactModelOpen })
  }


  render() {
    return (
      <div className='single-Event-Container' >

        <div className="wrapper">
          <div className='single-Event-Header'>
            <h2>Event: <span className="title">{this.props.singleEvent.name}</span></h2>
          </div>
          <div id="event_add_contact_to_event">
            <a onClick={() => this.toggleModal('addContacts')} className="btn" id="btn_addParticipantEvent">Add Contact to Event</a>

            <DashboardModal show={this.state.isAddContactModelOpen} onClose={() => this.toggleModal('addContacts')}>
              <AddContactsToEventForm participants={this.props.participants} />
            </DashboardModal>
            <li className='single-Event-View-Mosaic-Button'><NavLink to={`/events/${this.props.singleEvent.id}/mosaic`}>View Mosaic</NavLink></li>
            <li className='single-Event-View-Uplad-Button'><NavLink to={`/events/${this.props.singleEvent.id}/upload`}>Upload Content</NavLink></li>
          </div>
          <div id='event_participants_list'>
            <div className='single-Event-Contacts-List-Header'>
              <h2>Participants:</h2>
            </div>
            <table>
              <tbody>
                {
                  this.props.participants.map(participant => (
                    <tr key={participant.contact.id}>
                      <td>{participant.contact.name}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <button id="send_text" onClick={() => {broadcastTextMessage({eventId: this.props.match.params.eventId})}}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleEvent: state.singleEvent,
    participants: state.participants
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadEvent(eventId) {
      dispatch(fetchSingleEvent(eventId))
      dispatch(fetchPartipants(eventId))
    },
  }
}

const SingleEventContainer = connect(mapState, mapDispatch)(SingleEvent)


export default SingleEventContainer
