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
        const totalContacts = props.contacts.length;
        const resultsPerPage = props.resultsPerPage;

        console.log('totalContacts: ', totalContacts);

        this.totalPages = Math.ceil(totalContacts / resultsPerPage);

        // console.log('number of pages: ', this.totalPages);

        this.state = { currentPage: 1 };
    }

    fetchPageNumbers = () => {

        // local variables for convenience
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;

        return paginationArrayGenerator(totalPages, currentPage);

        // establishing the total number of pages to show on the control widget
        // including first and last
        // const totalNumbersToShow = 5;
        // // console.log('totalNumbersToShow: ', totalNumbersToShow);

        // // including left and right arrows
        // const totalBlocks = totalNumbersToShow + 2;

        // if (totalPages > totalBlocks) {

        //     // TODO: check how many times (and why) we cycle over this code

        //     const startPage = Math.max(1, currentPage - 2);
        //     const endPage = Math.min(totalPages, currentPage + 2);
        //     // console.log('startPage: ', startPage);
        //     // console.log('endpage: ', endPage);

        //     let pagesToShow = _.range(startPage, endPage + 1);
        //     // console.log('pagesToShow: ', pagesToShow);

        //     const hasHiddenPagesLeft = startPage > 2;
        //     const hasHiddenPagesRight = (totalPages - endPage) > 1;

        //     switch (true) {
        //         // handle: (1) < {5 6} [7] {8 9} (10)
        //         case (hasHiddenPagesLeft && !hasHiddenPagesRight): {
        //             // console.log('hasHiddenPagesLeft && !hasHiddenPagesRight');
        //             pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow];
        //             break;
        //         }
        //         // handle: (1) {2 3} [4] {5 6} > (10)
        //         case (hasHiddenPagesRight && !hasHiddenPagesLeft): {
        //             // console.log('hasHiddenPagesRight && !hasHiddenPagesLeft');
        //             pagesToShow = [...pagesToShow, RIGHT_PAGE, LAST_PAGE];
        //             // console.log('pagesToShow: ', pagesToShow)
        //             break;
        //         }

        //         // if hidden pages both right and left
        //         default: {
        //             console.log('default');

        //             pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow, RIGHT_PAGE, LAST_PAGE];
        //             break;
        //         }
        //     }
        //     // console.log('returned pages: ', [1, ...pagesToShow, totalPages]);
        //     return pagesToShow;
        // };

        // // console.log('returned few pages: ', _.range(1, totalPages + 1));
        // // returning only the pages if <= 5
        // return _.range(1, totalPages + 1);
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
        console.log('pages: ', pages);
        // console.log('last page: ', lastPage);

        return (
            <div className='fa-pagination'>
                <h3>Pages: {pages}</h3>
                <h3>Pages {this.state.currentPage} of {lastPage}</h3>
                <ul>
                    {pages.map((page, index) => {
                        if (page === FIRST_PAGE) return (
                            <li key={0} className={`page-item${this.state.currentPage === 1 ? ' active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => this.handleClick(1)}>&laquo;
                                </a>
                            </li>
                        );

                        if (page === LAST_PAGE) return (
                            <li key={lastPage + 1} className={`page-item${this.state.currentPage === lastPage ? ' active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => this.handleClick(lastPage)}>&raquo;</a>
                            </li>
                        );

                        if (page === LEFT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                                    <span aria-hidden="true">&lt;</span>
                                    <span className="sr-only"></span>
                                </a>
                            </li>
                        );

                        if (page === RIGHT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                                    <span aria-hidden="true">&gt;</span>
                                    <span className="sr-only"></span>
                                </a>
                            </li>
                        );
                        return (
                            <li key={index} className={`page-item${this.state.currentPage === page ? ' active' : ''}`}>
                                <a className="page-link" href="#" onClick={() => this.handleClick(page)}>{page}</a>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
};

export default Pagination;