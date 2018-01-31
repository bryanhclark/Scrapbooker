import React from 'react'
import { NavLink } from 'react-router-dom'



const EventList = (props) => {
  return (
    <div className='event-List-Container'>
      <h3>Event List Container</h3>
      {
        props.events.map(event => (
          <div className='single-Event-In-List' key={event.id}>
            <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
          </div>
        ))
      }
    </div>
  )
}

export default EventList