import React, { Component } from 'react';
import '../styles/list-header.css';

class ListHeader extends Component {

    handleClick = (sortBy) => {
        console.log('wowza! you clicked me with sortBy: ', this.props);
        const { onSortChange = f => f } = this.props;
        let ascending = !this.props.filters.ascending;

        const filters = {
            sortBy,
            ascending
        };
        console.log('wowza! you clicked me with filters: ', filters);


        this.setState({ filters }, () => onSortChange(filters));
    }

    render() {
        return (
            <div className='fa-list-header'>
                <div className='fa-list-header-info'>
                    <h2>Users: {this.props.totalContacts}</h2>
                </div>
                <div className='fa-list-header-titles'>
                    <button className='fa-list-header-titles-button' onClick={() => this.handleClick('first')}>First Name</button>
                    <button className='fa-list-header-titles-button' onClick={() => this.handleClick('last')}>Last Name</button>
                    <button className='fa-list-header-titles-button' onClick={() => this.handleClick('email')}>email</button>
                </div>
            </div>
        );
    }
}

export default ListHeader;