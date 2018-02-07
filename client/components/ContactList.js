import React from 'react'



const ContactList = (props) => {
	return (
		<div className='event-List-Container'>
			<h3 className='header_dash'>Your Contacts</h3>
			<div id="contacts_list">
				<table>
					<tbody>
						{
							props.contacts.map(contact => (
								<tr className="table_row" key={contact.id}>
									<td className="td_contacts td_cell">{contact.firstName}</td>
									<td className="td_contacts td_cell">{contact.phone}</td>
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
