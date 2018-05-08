# Front-End Sample
Sample project for evaling front-end development techniques and skills.


## Goal:
Create client side JavaScript app that lists 500 users in a sortable table.

### Data
- The data should be loaded once per page load via AJAX from [https://randomuser.me](https://randomuser.me)

### Table
- Display the user's first name, last name, and email address in each column.
- Clicking the user's email will open an email client.
- The table header should show which column is currently sorted by, and direction.
- The table should show only 10 users at a time.

#### Sorting
- The table should be sortable by each column.
- Clicking on a new column will sort the new column ascending.
- Clicking on the currently sorted column will reverse the sort direction.

#### Pagination
- There should be an indicator below the table showing which users are visible
- There should be controls below the table to go to next page, previous page, etc
	- If there is no previous or next page, the links should be hidden or disabled.

Example:

![Sample](./sample.png)
