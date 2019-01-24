export const contactSort = (contacts = [], filters) => {

    //take in array and filters and return sorted array

    const ascending = filters.ascending;

    const sortedContacts = contacts.sort((a, b) => {
        let lowerA;
        let lowerB;

        switch (filters.sortBy) {
            case ('last'): {
                lowerA = a.name.last.toLowerCase();
                lowerB = b.name.last.toLowerCase();
                break
            }
            case ('email'): {
                lowerA = a.email;
                lowerB = b.email;
                break
            }
            default: {
                lowerA = a.name.first.toLowerCase();
                lowerB = b.name.first.toLowerCase();
                break
            }
        }

        if (ascending) {
            if (lowerA < lowerB) return -1;
            else return 1;
        }
        else {
            if (lowerB < lowerA) return -1;
            else return 1;
        }
    });
    return sortedContacts;
};

export default contactSort;