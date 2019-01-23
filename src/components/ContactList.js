import React from 'react';
import ContactListItem from './ContactListItem';
import '../styles/contact-list.css';

const ContactList = (props) => (
    <div className='fa-contact-list'>
        {props.currentContacts.map((contact, index) => (
            <ContactListItem key={index} contact={contact} />
        ))}
    </div>
);

export default ContactList;