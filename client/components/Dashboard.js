import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DashboardModal, CreateEventForm, EventList, ContactList, CreateContactForm } from './index'
import { fetchCurrentEvents } from '../store/currentEvents'
import { getCurrentContacts } from '../store/contacts'
import { me } from '../store/user'


class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isEventCreationModalOpen: false,
			isContactCreationModalOpen: false
		}
		this.toggleModal = this.toggleModal.bind(this)
	}

	componentDidMount() {
		this.props.loadCurrentInfo(this.props.user.id)
	}

	toggleModal = (name) => {
		if (name === 'contacts') this.setState({ isContactCreationModalOpen: !this.state.isContactCreationModalOpen })
		else if (name === 'events') this.setState({ isEventCreationModalOpen: !this.state.isEventCreationModalOpen })
	}

	render() {
		console.log(this.props.user.fullName !== 'null null')
		return (
			<div className='main-Dashboard-Container'>
				<div className="wrapper">
					<h3>Welcome, {(this.props.user.fullName !== 'null null') ?
						this.props.user.fullName : "" }</h3>
					<div className="modal_btns">
						<div className='dashboard-Button-Main-Container'>
							<div className='event-Creation-Modal-Container'>
								<a onClick={() => this.toggleModal('events')} className="btn">Create Event</a>
								<DashboardModal show={this.state.isEventCreationModalOpen} onClose={() => this.toggleModal('events')}>
									<CreateEventForm user={this.props.user} show={this.toggleModal} />
								</DashboardModal>
							</div>
							<div className='contact-Creation-Modal-Container'>
								<a onClick={() => this.toggleModal('contacts')} className="btn">Create Contact</a>
								<DashboardModal show={this.state.isContactCreationModalOpen} onClose={() => this.toggleModal('contacts')}>
									<CreateContactForm user={this.props.user} show={this.toggleModal} />
								</DashboardModal>
							</div>
						</div>
					</div>
					<div className='dashboard-EventList-Container'>
						<EventList events={this.props.currentEvents} />
					</div>
					<div className='dashboard-ContactList-Container'>
						<ContactList contacts={this.props.contacts} />
					</div>
				</div>
			</div>
		)
	}
}

const mapState = (state) => {
	return {
		user: state.user,
		currentEvents: state.currentEvents,
		contacts: state.contacts

	}
}

const mapDispatch = (dispatch) => {
	return {
		loadCurrentInfo() {
			return dispatch(me())
				.then(result => {
					dispatch(fetchCurrentEvents(result.user.id))
					dispatch(getCurrentContacts(result.user.id))
				})
		}
	}
}

const dashboardContainer = connect(mapState, mapDispatch)(Dashboard)

export default dashboardContainer;
