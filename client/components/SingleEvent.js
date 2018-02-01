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
    return (
      <div className='single-Event-Container' >
        <div className="wrapper">
          <div className='single-Event-Header'>
            <h2>Event: <span className="title">{this.props.singleEvent.name}</span></h2>
          </div>
          <ul className='single-Event-Button-List'>
            <div className='single-Event-Button-Container'>
              <li className='single-Event-Button'><a onClick={() => this.toggleModal('addContacts')} className="btn">Add Contact to Event</a></li>
              <DashboardModal show={this.state.isAddContactModelOpen} onClose={() => this.toggleModal('addContacts')}>
                <AddContactsToEventForm />
              </DashboardModal>
            </div>
          </ul>
          <div className='single-Event-Contacts-List-Container'>
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

    }
  }
}

const SingleEventContainer = connect(mapState, mapDispatch)(SingleEvent)


export default SingleEventContainer