import React from 'react';
import '../styles/contact-list-item.css';

const ContactListItem = (props) => (
    <div className='fa-contact-list-item'>
        <span className='fa-contact-list-item-element'>{props.contact.name.first} </span>
        <span className='fa-contact-list-item-element'>{props.contact.name.last} </span>
        <span className='fa-contact-list-item-element'>
            <a href={`mailto:${props.contact.email}`}>{props.contact.email}</a>
        </span>
    </div>
);

export default ContactListItem;