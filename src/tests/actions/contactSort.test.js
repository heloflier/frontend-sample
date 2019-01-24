import { contactSort } from '../../actions/contactSort';
import contacts_short from '../fixtures/contacts-short';
import contacts_short_sorted_firstname_asc from '../fixtures/contacts-short-sorted-firstname-asc';
import contacts_short_sorted_firstname_desc from '../fixtures/contacts-short-sorted-firstname-desc';
import contacts_short_sorted_lastname_asc from '../fixtures/contacts-short-sorted-lastname-asc';
import contacts_short_sorted_lastname_desc from '../fixtures/contacts-short-sorted-lastname-desc';
import contacts_short_sorted_email_asc from '../fixtures/contacts-short-sorted-email-asc';
import contacts_short_sorted_email_desc from '../fixtures/contacts-short-sorted-email-desc';

let filters = { 
    sortBy: null,
    ascending: true 
};

test('should return an array sorted by first name ascending if not specified', () => {
    const action = contactSort(contacts_short, filters);
    expect(action).toEqual(contacts_short_sorted_firstname_asc);
});

test('should return an array sorted by first name ascending', () => {
    const _filters = {
        sortBy: 'first',
        ascending: true
    };
    const action = contactSort(contacts_short, _filters);
    expect(action).toEqual(contacts_short_sorted_firstname_asc);
});

test('should return an array sorted by first name descending', () => {
    const _filters = {
        sortBy: 'first',
        ascending: false
    };
    const action = contactSort(contacts_short, _filters);
    expect(action).toEqual(contacts_short_sorted_firstname_desc);
});

test('should return an array sorted by last name ascending', () => {
    const _filters = {
        sortBy: 'last',
        ascending: true
    };
    const action = contactSort(contacts_short,  _filters);
    expect(action).toEqual(contacts_short_sorted_lastname_asc);
});

test('should return an array sorted by last name descending', () => {
    const _filters = {
        sortBy: 'last',
        ascending: false
    };
    const action = contactSort(contacts_short,  _filters);
    expect(action).toEqual(contacts_short_sorted_lastname_desc);
});

test('should return an array sorted by email ascending', () => {
    const _filters = {
        sortBy: 'email',
        ascending: true
    };
    const action = contactSort(contacts_short, _filters);
    expect(action).toEqual(contacts_short_sorted_email_asc);
});

test('should return an array sorted by email descending', () => {
    const _filters = {
        sortBy: 'email',
        ascending: false
    };
    const action = contactSort(contacts_short, _filters);
    expect(action).toEqual(contacts_short_sorted_email_desc);
});