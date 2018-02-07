import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchPartipants } from '../store/participants'
import { DashboardModal, ContactList, AddContactsToEventForm } from './index'
import { NavLink } from 'react-router-dom'
import { broadcastTextMessage } from '../store/twilio'
import { broadcastEmail } from '../store/email'
import { fetchCurrentParticipant } from '../store/singleParticipant'

class SingleEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddContactModelOpen: false,
      participantsToMessage: []
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.addOrRemoveParticipantFromMessageList = this.addOrRemoveParticipantFromMessageList.bind(this)
  }

  componentDidMount() {
    this.props.loadEvent(this.props.match.params.eventSecret)
    this.props.setParticipant(this.props.user.userHash)
  }

  toggleModal = (name) => {
    if (name === 'addContacts') this.setState({ isAddContactModelOpen: !this.state.isAddContactModelOpen })
  }
  addOrRemoveParticipantFromMessageList = (e, userHash) => {
    let checked = e.target.checked
    if (checked) {
      let participantToAdd = this.props.participants.filter(participant => {
        if (participant.user.userHash === userHash) return participant
      })
      console.log('participant to add', participantToAdd[0])
      let addParticipantsArray = [...this.state.participantsToMessage, participantToAdd[0]]
      this.setState({ participantsToMessage: addParticipantsArray })
    }
    else {
      let updatedParticipantList = this.state.participantsToMessage.filter(participant => {
        if (participant.user.userHash !== userHash) return participant
      })
      this.setState({ participantsToMessage: updatedParticipantList })
    }
  }


  render() {
    return (
      <div className='single-Event-Container' >
        <div className="wrapper">
          <div className='single-Event-Header'>
            <h2>Event: <span className="title">{this.props.singleEvent.name}</span></h2>
          </div>
          <div id="event_add_contact_to_event">
            <a onClick={() => this.toggleModal('addContacts')} className="btn" id="btn_addParticipantEvent">Add Participant</a>

            <DashboardModal show={this.state.isAddContactModelOpen} onClose={() => this.toggleModal('addContacts')}>
              <AddContactsToEventForm participants={this.props.participants} show={this.toggleModal} />
            </DashboardModal>
            <NavLink to={`/events/${this.props.singleEvent.secret}/mosaic/${this.props.user.userHash}`} className="btn">View Mosaic</NavLink>
            <NavLink to={`/events/${this.props.singleEvent.secret}/upload/${this.props.user.userHash}`} className="btn">Upload Content</NavLink>
          </div>
          <div id='participants_section'>
            <h2 className="section_header">Participants:</h2>
            <div id="participants_items">
              <table>
                <tbody>
                  {
                    this.props.participants.map(participant => (
                      <tr className="table_row" key={participant.user.id}>
                        <td><input type='checkbox' onChange={(e) => this.addOrRemoveParticipantFromMessageList(e, participant.user.userHash)} /></td>
                        <td>{participant.user.fullName}</td>
                        <td>{participant.user.phone}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="section_header">Invite Participants</h2>
            <p>Please check the participants above you want to contact and choose the method of communication below:</p>
            <button className="btn" id="send_text" onClick={() => { broadcastTextMessage({ participants: this.state.participantsToMessage, organizer: this.props.user, event: this.props.singleEvent }) }}>Send SMS</button>
            <button className="btn" id="send_text" onClick={() => { broadcastEmail({ id: this.props.singleEvent.id }) }}>Send Email</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    singleEvent: state.singleEvent,
    participants: state.participants
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadEvent(eventSecret) {
      dispatch(fetchSingleEvent(eventSecret))
      dispatch(fetchPartipants(eventSecret))
    },

    setParticipant(contactHash) {
      dispatch(fetchCurrentParticipant(contactHash))
    }

  }
}

const SingleEventContainer = connect(mapState, mapDispatch)(SingleEvent)


export default SingleEventContainer
