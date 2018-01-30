import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DashboardModal, CreateEventForm, EventList } from './index'
import { fetchCurrentEvents } from '../store/currentEvents'


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEventCreationModalOpen: false
        }
        this.toggleEventCreationModal = this.toggleEventCreationModal.bind(this)
    }

    componentDidMount() {
        this.props.loadCurrentEvents(this.props.user.id)
    }

    toggleEventCreationModal = () => {
        this.setState({
            isEventCreationModalOpen: !this.state.isEventCreationModalOpen
        })
    }

    render() {
        return (
            <div className='main-Dashboard-Container'>
                <h3>Welcome, {this.props.user.fullName}</h3>
                <ul className='dashboard-Button-List'>
                    <div className='dashboard-Button-Main-Container'>
                        <div className='event-Creation-Modal-Container'>
                            <li className='dashboard-Button'><a onClick={this.toggleEventCreationModal}>Create Event</a></li>
                            <DashboardModal show={this.state.isEventCreationModalOpen} onClose={this.toggleEventCreationModal}>
                                <CreateEventForm user={this.props.user} />
                            </DashboardModal>
                        </div>
                    </div>
                </ul>
                <div className='dashboard-EventList-Container'>
                    <EventList events={this.props.currentEvents} />
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user,
        currentEvents: state.currentEvents,
        events: state.events
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadCurrentEvents(organizerId) {
            dispatch(fetchCurrentEvents(organizerId))
        }
    }
}

const dashboardContainer = connect(mapState, mapDispatch)(Dashboard)

export default dashboardContainer;