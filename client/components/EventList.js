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
                <td className="td_eventName"><NavLink to={`/events/${event.id}`}>{event.name}</NavLink></td>
                <td className="td_eventGo"><NavLink to={`/events/${event.id}`}>Go!</NavLink></td>
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