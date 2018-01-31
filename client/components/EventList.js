import React from 'react'



const EventList = (props) => {
    return (
        <div className='event-List-Container'>
            <h3>Event List Container</h3>
            {
                props.events.map(event => (
                    <div className='single-Event-In-List' key={event.id}>
                        {event.name}
                    </div>
                ))
            }
        </div>
    )
}

export default EventList