import React from 'react'



const ContactList = (props) => {
	return (
		<div className='event-List-Container'>
			<h3>Your Contacts</h3>
			<div id="contacts_list">
				<table>
					<tbody>
						{
							props.contacts.map(contact => (
								<tr className="table_row" key={contact.id}>
									<td className="contact_name">{contact.firstName}</td>
									<td className="contact_phone">{contact.phone}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ContactList
