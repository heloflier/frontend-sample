import React, { Component } from 'react';
import '../styles/App.css';
import ContactList from './ContactList';
import Pagination from './Pagination';
import ListHeader from './ListHeader';
import contactSort from '../actions/contactSort';

class App extends Component {

    state = {
        error: null,
        isLoaded: false,
        allContacts: [],
        currentContacts: [],
        totalRequestedContacts: 100,
        resultsPerPage: 10,
        currentPage: null,
        totalPages: null,
        filters: {
            sortBy: null,
            ascending: true
        }
    };

    componentDidMount() {
        const APICall = `https://randomuser.me/api/?results=${this.state.totalRequestedContacts}&inc=name,email`
        fetch(APICall)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        allContacts: data.results,
                        sortedContacts: data.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    onPageChanged = (data) => {
        const { allContacts, resultsPerPage } = this.state;
        const { currentPage, totalPages } = data;

        const offset = (currentPage - 1) * resultsPerPage;
        const currentContacts = allContacts.slice(offset, offset + resultsPerPage);

        this.setState({ currentPage, currentContacts, totalPages });
    }

    onSortChange = (filters) => {

        const sortedContacts = contactSort(this.state.allContacts, filters);
        const { resultsPerPage, currentPage } = this.state;
        const offset = (currentPage - 1) * resultsPerPage;
        const currentContacts = sortedContacts.slice(offset, offset + resultsPerPage);

        // move the sorted file into the state
        this.setState(() => ({ 
            allContacts: sortedContacts,
            currentContacts,
            filters
        }));
    }

    render() {
        const { error, isLoaded, allContacts } = this.state;
        const totalContacts = allContacts.length;
        if (error) {
            return <div>Error: Could not read from provided API</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (allContacts.length === 0) {
            return <h2>No contacts</h2>

        } else {
            return (
                <div className='fa-app-container'>
                    <ListHeader 
                        filters={this.state.filters}
                        totalContacts={totalContacts}
                        onSortChange={this.onSortChange}
                    />
                    <ContactList currentContacts={this.state.currentContacts} />
                    <Pagination
                        contacts={this.state.allContacts}
                        resultsPerPage={this.state.resultsPerPage}
                        numberDisplayed={this.state.currentContacts.length}
                        onPageChanged={this.onPageChanged}
                    />
                </div >
            );
        }
    }
}

export default App;
