import React from 'react'



const ContactList = (props) => {
    return (
        <div className='event-List-Container'>
            <h3>Contact List Container</h3>
            {
                props.contacts.map(contact => (
                    <div className='single-Event-In-List' key={contact.id}>
                        {contact.name}
                    </div>
                ))
            }
        </div>
    )
}

export default ContactList