import React, { Component } from 'react'
import { connect } from 'react-redux'
import participants, { addParticipantsToEvent, addParticipants } from '../store/participants'


class AddContactsToEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactsToAdd: []
    }
    this.addContactToEvent = this.addContactToEvent.bind(this)
    this.removeContactFromEvent = this.removeContactFromEvent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let contactsToAdd = this.props.participants.map(participant => {
      return participant.user
    })
    this.setState({ contactsToAdd })
  }

  addContactToEvent(newContact) {
    let contains = false
    this.state.contactsToAdd.forEach(contact => { if (contact.id === newContact.id) { contains = true } })
    if (contains === false) {
      const contactsToAdd = [...this.state.contactsToAdd, newContact]
      this.setState({ contactsToAdd })
    }
  }

  removeContactFromEvent(removeContact) {
    const filteredContactList = this.state.contactsToAdd.filter(contact => { if (contact.id !== removeContact.id) return contact })
    this.setState({ contactsToAdd: filteredContactList })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addContactsToEvent(this.state.contactsToAdd, this.props.singleEvent.id)
  }



  render() {
    return (
      <div className='add-Contacts-To-Event-Form-Container' >
        <h4>Add Contacts To Event: {this.props.singleEvent.name}</h4>
        <div className='contacts-List-Add-Contacts-To-Event'>
          {
            this.props.contacts.map(contact => (
              <div className='single-Contact-Container-Add-Contacts-To-Event' key={contact.id}>
                <button onClick={() => this.addContactToEvent(contact)}>+</button>{contact.fullName}<button onClick={() => this.removeContactFromEvent(contact)}>-</button>
              </div>
            ))
          }
          <div className="btn_area">
            <button className="btn" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
        <ul className='contacts-To-Be-Added-List'>
          <div className='current-Contact-List-To-Add-Container'>
            <div className='current-Contact-List-To-Add-Header'>
              <p>contacts to be added to: {this.props.singleEvent.name}</p>
              {
                this.state.contactsToAdd.map(contact => (
                  <li key={contact.id}>{contact.fullName}</li>
                ))
              }
            </div>
          </div>
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleEvent: state.singleEvent,
    contacts: state.contacts,
    participants: state.participants
  }
}

const mapDispatch = (dispatch) => {
  return {
    addContactsToEvent(contactsArray, eventId) {
      dispatch(addParticipantsToEvent(contactsArray, eventId))
    }
  }
}




const AddContactsToEventFormContainer = connect(mapState, mapDispatch)(AddContactsToEventForm)

export default AddContactsToEventFormContainer