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
                    <button
                        className={`fa-list-header-titles-button ${this.props.filters.sortBy === 'first' ? ' active' : ''}`}
                        onClick={() => this.handleClick('first')}
                    >
                        First Name
                        <div className='fa-list-header-titles-button-sort-direction'>
                            {this.props.filters.ascending ? (<div>&#9650;</div>) : (<div>&#9660;</div>)}
                        </div>
                        <div className='fa-list-header-titles-button-no-sort'>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9650;</div>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9660;</div>
                        </div>
                    </button>
                    <button
                        className={`fa-list-header-titles-button ${this.props.filters.sortBy === 'last' ? ' active' : ''}`}
                        onClick={() => this.handleClick('last')}
                    >
                        <div>Last Name</div>
                        <div className='fa-list-header-titles-button-sort-direction'>
                            {this.props.filters.ascending ? (<div>&#9650;</div>) : (<div>&#9660;</div>)}
                        </div>
                        <div className='fa-list-header-titles-button-no-sort'>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9650;</div>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9660;</div>
                        </div>
                    </button>
                    <button
                        className={`fa-list-header-titles-button ${this.props.filters.sortBy === 'email' ? ' active' : ''}`}
                        onClick={() => this.handleClick('email')}
                    >
                        email
                        <div className='fa-list-header-titles-button-sort-direction'>
                            {this.props.filters.ascending ? (<div>&#9650;</div>) : (<div>&#9660;</div>)}
                        </div>
                        <div className='fa-list-header-titles-button-no-sort'>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9650;</div>
                            <div className='fa-list-header-titles-button-no-sort-arrow'>&#9660;</div>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}

export default ListHeader;