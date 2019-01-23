import _ from 'lodash';
import React, { Component } from 'react';
import '../styles/pagination.css';
import paginationArrayGenerator from '../actions/paginationArrayGenerator';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const FIRST_PAGE = 'FIRST';
const LAST_PAGE = 'LAST';

class Pagination extends Component {
    constructor(props) {
        super(props);

        // determining the total number of pages
        this.totalContacts = props.contacts.length;
        const resultsPerPage = props.resultsPerPage;

        console.log('totalContacts: ', this.totalContacts);

        this.totalPages = Math.ceil(this.totalContacts / resultsPerPage);

        // console.log('number of pages: ', this.totalPages);

        this.state = { currentPage: 1 };
    }

    fetchPageNumbers = () => {

        // local variables for convenience
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        
        // establishing the total number of pages to show on the control widget
        // including first and last
        return paginationArrayGenerator(totalPages, currentPage);

    }
    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = page => {
        // console.log('goto page: ', page);
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            resultsPerPage: this.resultsPerPage,
            allContacts: this.allContacts
        };

        this.setState({ currentPage }, () => onPageChanged(paginationData));
    }

    handleClick = (page) => {
        console.log('wowza! you clicked me with page number: ', page);
        this.gotoPage(page);
    }

    handleMoveLeft = (index) => {
        console.log('moving left from ', index);
        this.gotoPage(this.state.currentPage -3);
    }

    handleMoveRight = (index) => {
        console.log('moving right from ', index);
        this.gotoPage(this.state.currentPage +3);
    }

    render() {
        const pages = this.fetchPageNumbers();
        const lastPage = this.totalPages;
        const displayCountStart = ((this.state.currentPage -1) * 10 + 1 );
        const displayCountEnd = ((this.state.currentPage -1) * 10 + this.props.numberDisplayed);
        console.log('pages: ', pages);
        console.log('displayCountEnd: ', displayCountEnd);

        return (
            <div className='fa-pagination'>
                <h3>Pages: {pages}</h3>
                <h3>Pages {this.state.currentPage} of {lastPage}</h3>
                <h3>Displaying {displayCountStart}{(displayCountStart !== displayCountEnd) && `-${displayCountEnd}`} of {this.totalContacts}</h3>
                <ul>
                    {pages.map((page, index) => {
                        if (page === FIRST_PAGE) return (
                            <li key={0} className={`${this.state.currentPage === 1 ? ' active' : ''}`}>
                                <a href="#" onClick={() => this.handleClick(1)}>&laquo;
                                </a>
                            </li>
                        );

                        if (page === LAST_PAGE) return (
                            <li key={lastPage + 1} className={`${this.state.currentPage === lastPage ? ' active' : ''}`}>
                                <a href="#" onClick={() => this.handleClick(lastPage)}>&raquo;</a>
                            </li>
                        );

                        if (page === LEFT_PAGE) return (
                            <li key={index} className="">
                                <a href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                                    <span>&lt;</span>
                                </a>
                            </li>
                        );

                        if (page === RIGHT_PAGE) return (
                            <li key={index} className="">
                                <a href="#" aria-label="Next" onClick={this.handleMoveRight}>
                                    <span>&gt;</span>
                                </a>
                            </li>
                        );
                        return (
                            <li key={index} className={`${this.state.currentPage === page ? ' active' : ''}`}>
                                <a href="#" onClick={() => this.handleClick(page)}>{page}</a>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
};

export default Pagination;