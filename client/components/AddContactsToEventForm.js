import React, { Component } from 'react'
import { connect } from 'react-redux'
import participants, { addParticipantsToEvent, addParticipants } from '../store/participants'


class AddContactsToEventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactsToAdd: [],
      possibleContacts: []
    }
    this.addContactToEvent = this.addContactToEvent.bind(this)
    this.removeContactFromEvent = this.removeContactFromEvent.bind(this)
    this.removePossibleContact = this.removePossibleContact.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let contactsToAdd = this.props.participants.map(participant => {
      return participant.user
    })

    this.setState({ contactsToAdd, possibleContacts: this.filterPossibleContactList(this.props.contacts) })

  }

  filterPossibleContactList(contactArray) {
    console.log('this.props.participants', this.props.participants)
    let filteredContacts = []
    //loop throuch contactArray
    //loop through contactsToAddArray
    for (let i = 0; i < contactArray.length; i++) {
      for (let j = 0; j < this.props.participants.length; j++) {
        if (contactArray[i].id === this.props.participants[j].user.id) break
        else if (j === this.props.participants.length - 1) {
          filteredContacts.push(contactArray[i])
        }
      }
    }
    console.log(filteredContacts)
    return filteredContacts
  }

  addContactToEvent(newContact) {
    let contains = false
    this.state.contactsToAdd.forEach(contact => { if (contact.id === newContact.id) { contains = true } })
    if (contains === false) {
      const contactsToAdd = [...this.state.contactsToAdd, newContact]
      this.setState({ contactsToAdd })
    }
    this.removePossibleContact(newContact)
  }

  removeContactFromEvent(removeContact) {
    console.log('this.state.possibleContacts', this.state.possibleContacts)
    const filteredContactList = this.state.contactsToAdd.filter(contact => { if (contact.id !== removeContact.id) return contact })
    let newPossibleContacts = [...this.state.possibleContacts, removeContact]
    this.setState({ contactsToAdd: filteredContactList, possibleContacts: newPossibleContacts })
  }
  removePossibleContact(contactToBeRemoved) {
    let filteredPossibleContacts = this.state.possibleContacts.filter(contact => {
      if (contact.id !== contactToBeRemoved.id) return contact
    })
    this.setState({ possibleContacts: filteredPossibleContacts })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.addContactsToEvent(this.state.contactsToAdd, this.props.singleEvent.id)
  }

  render() {
    return (
      <div className='add-Contacts-To-Event-Form-Container' >
        <h4 className='modal_header'>Add Participants To {this.props.singleEvent.name}</h4>

        <div id='current_participants'>
          <p className='header_subsection'>Current Participants</p>
          <table className="table_row">
            <tbody>
              {this.state.contactsToAdd.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.fullName}</td>
                  <td><button id='remove-contact' onClick={() => this.removeContactFromEvent(contact)}>-</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>

        <div id='add_participants'>
          <p className='header_subsection'>Available Contacts</p>
          <table className="table_row">
            <tbody>
              {this.state.possibleContacts.map(contact => (
                <tr key={contact.id} className="table_row">
                  <td>{contact.fullName}</td>
                  <td><button onClick={() => this.addContactToEvent(contact)}>+</button></td>
                </tr>
              ))
              }
            </tbody>
          </table>
          <div className="btn_area"><button className="btn" id="add_participant_btn" onClick={this.handleSubmit}>Submit</button></div>
        </div>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    addContactsToEvent(contactsArray, eventId) {
      dispatch(addParticipantsToEvent(contactsArray, eventId))
      ownProps.show('addContacts')
    }
  }
}

const AddContactsToEventFormContainer = connect(mapState, mapDispatch)(AddContactsToEventForm)

export default AddContactsToEventFormContainer
