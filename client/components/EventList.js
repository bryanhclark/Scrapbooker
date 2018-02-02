import React from 'react'
import { NavLink } from 'react-router-dom'



const EventList = (props) => {
  return (
    <div className='event-List-Container'>
      <h3>Your Events</h3>

      <div id="events_list">
        <table>
          <tbody>
            {props.events.map(event => (
              <tr className='table_row' key={event.id}>
                <td>
                  <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default EventList