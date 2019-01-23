import _ from 'lodash';

const paginationArrayGenerator = (totalPages, currentPage) => {

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';
    const FIRST_PAGE = 'FIRST';
    const LAST_PAGE = 'LAST';
    const totalNumbersToShow = 5;
    // console.log('totalNumbersToShow: ', totalNumbersToShow);

    // including left and right arrows
    const totalBlocks = totalNumbersToShow + 2;

    if (totalPages > totalBlocks) {

        // TODO: check how many times (and why) we cycle over this code

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        // console.log('startPage: ', startPage);
        // console.log('endpage: ', endPage);

        let pagesToShow = _.range(startPage, endPage + 1);
        // console.log('pagesToShow: ', pagesToShow);

        const hasHiddenPagesLeft = startPage > 2;
        const hasHiddenPagesRight = (totalPages - endPage) > 1;

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasHiddenPagesLeft && !hasHiddenPagesRight): {
                // console.log('hasHiddenPagesLeft && !hasHiddenPagesRight');
                pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow];
                break;
            }
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (hasHiddenPagesRight && !hasHiddenPagesLeft): {
                // console.log('hasHiddenPagesRight && !hasHiddenPagesLeft');
                pagesToShow = [...pagesToShow, RIGHT_PAGE, LAST_PAGE];
                // console.log('pagesToShow: ', pagesToShow)
                break;
            }

            // if hidden pages both right and left
            default: {
                console.log('default');

                pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow, RIGHT_PAGE, LAST_PAGE];
                break;
            }
        }
        // console.log('returned pages: ', [1, ...pagesToShow, totalPages]);
        return pagesToShow;
    };

    // console.log('returned few pages: ', _.range(1, totalPages + 1));
    // returning only the pages if <= 5
    return _.range(1, totalPages + 1);


};

export default paginationArrayGenerator;