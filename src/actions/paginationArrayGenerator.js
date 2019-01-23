import _ from 'lodash';

const paginationArrayGenerator = (totalPages, currentPage) => {

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';
    const FIRST_PAGE = 'FIRST';
    const LAST_PAGE = 'LAST';
    const totalNumbersToShow = 5;

    // including left and right arrows
    const totalBlocks = totalNumbersToShow + 2;

    if (totalPages > totalBlocks) {

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        let pagesToShow = _.range(startPage, endPage + 1);

        const hasHiddenPagesLeft = startPage > 1;
        const hasHiddenPagesRight = (totalPages - endPage) > 0;

        switch (true) {
            // hidden pages  left
            case (hasHiddenPagesLeft && !hasHiddenPagesRight): {
                pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow];
                break;
            }
            // hidden pages right
            case (hasHiddenPagesRight && !hasHiddenPagesLeft): {
                pagesToShow = [...pagesToShow, RIGHT_PAGE, LAST_PAGE];
                break;
            }
            // if hidden pages both right and left
            default: {
                pagesToShow = [FIRST_PAGE, LEFT_PAGE, ...pagesToShow, RIGHT_PAGE, LAST_PAGE];
                break;
            }
        }
        return pagesToShow;
    };
    return _.range(1, totalPages + 1);
};

export default paginationArrayGenerator;