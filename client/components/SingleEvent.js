import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSingleEvent } from '../store/singleEvent'
import { fetchPartipants } from '../store/participants'
import { DashboardModal, ContactList, AddContactsToEventForm } from './index'



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
    console.log('in toggle modal')
    if (name === 'addContacts') this.setState({ isAddContactModelOpen: !this.state.isAddContactModelOpen })
  }


  render() {
    console.log('in single event', this.props.participants)
    return (
      <div className='single-Event-Container' >
        <div className='single-Event-Header'>
          <h3>{this.props.singleEvent.name}</h3>
        </div>
        <ul className='single-Event-Button-List'>
          <div className='single-Event-Button-Container'>
            <li className='single-Event-Add-Contact-Button'><a onClick={() => this.toggleModal('addContacts')}>Add Contact to Event</a></li>
            <DashboardModal show={this.state.isAddContactModelOpen} onClose={() => this.toggleModal('addContacts')}>
              <AddContactsToEventForm />
            </DashboardModal>
            <li className='single-Event-View-Mosaic-Button'><a href={`/events/${this.props.singleEvent.id}/mosaic`}>View Mosaic</a></li>
            <li className='single-Event-View-Uplad-Button'><a href={`/events/${this.props.singleEvent.id}/upload`}>Upload Content</a></li>
          </div>
        </ul>
        <div className='single-Event-Contacts-List-Container'>
          <div className='single-Event-Contacts-List-Header'>
            <h3>Participants in {this.props.singleEvent.name}:</h3>
          </div>
          <ul>
            <div className='single-Event-Participants-List-Container'>
              {
                this.props.participants.map(participant => (
                  <li key={participant.contact.id}>{participant.contact.name}</li>
                ))
              }
            </div>
          </ul>
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

    }
  }
}

const SingleEventContainer = connect(mapState, mapDispatch)(SingleEvent)


export default SingleEventContainer