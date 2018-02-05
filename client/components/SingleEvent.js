import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchPartipants } from '../store/participants'
import { DashboardModal, ContactList, AddContactsToEventForm } from './index'
import { NavLink } from 'react-router-dom'
import { broadcastTextMessage } from '../store/twilio'



class SingleEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAddContactModelOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    this.props.loadEvent(this.props.match.params.eventSecret)
  }

  toggleModal = (name) => {
    if (name === 'addContacts') this.setState({ isAddContactModelOpen: !this.state.isAddContactModelOpen })
  }


  render() {
    console.log(this.props.singleEvent)
    return (
      <div className='single-Event-Container' >

        <div className="wrapper">
          <div className='single-Event-Header'>
            <h2>Event: <span className="title">{this.props.singleEvent.name}</span></h2>
          </div>
          <div id="event_add_contact_to_event">
            <a onClick={() => this.toggleModal('addContacts')} className="btn" id="btn_addParticipantEvent">Add Participant</a>

            <DashboardModal show={this.state.isAddContactModelOpen} onClose={() => this.toggleModal('addContacts')}>
              <AddContactsToEventForm participants={this.props.participants} />
            </DashboardModal>
            <NavLink to={`/events/${this.props.singleEvent.secret}/mosaic`} className="btn">View Mosaic</NavLink>
            <NavLink to={`/events/${this.props.singleEvent.secret}/upload`} className="btn">Upload Content</NavLink>
          </div>
          <div id='participants_section'>
            <h2 className="section_header">Participants:</h2>
            <div id="participants_items">
              <table>
                <tbody>
                  {
                    this.props.participants.map(participant => (
                      <tr key={participant.contact.id}>
                        <td>{participant.contact.name}</td>
                        <td>{participant.contact.phone}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="section_header">Invitations:</h2>
            <p>Send invitations to your participants</p>
            <button className="btn" id="send_text" onClick={() => { broadcastTextMessage(this.props.singleEvent) }}>Send invites!</button>
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
    loadEvent(eventSecret) {
      dispatch(fetchSingleEvent(eventSecret))
      dispatch(fetchPartipants(eventSecret))
    },

  }
}

const SingleEventContainer = connect(mapState, mapDispatch)(SingleEvent)


export default SingleEventContainer
