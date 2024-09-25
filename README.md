# Event Registration App

## Overview

This application simulates user registration for various types of events. The events are randomly generated using a seed script. Each event has a title, a brief description, the event's date, and the organizer's information. Additionally, each event card includes two links: one for the participant registration form and another to view the list of all participants for that specific event.

On the main events page, pagination and sorting are implemented by three criteria: title, event date, and organizer. The registration form page includes validation for the user's input. The form checks for a minimum number of characters for the name, standard email validation, and limits the date of birth field to users who are at least 18 years old. A custom `DatePicker` component is used instead of the standard date input. Upon form submission, a React toast notification informs the user of either a successful registration or an error.

On the participant list page, a search feature is implemented, allowing users to search for participants by name or email from the list of those registered for the event.

## Task Implementation

### Basic Level

**Completed:**

- **Events Board Page**: 
  - Implemented an events board page where users can view a paginated list of available events. Events can be pre-populated in the database manually or using a seed script. Each event consists of:
    - Title
    - Description
    - Event date
    - Organizer

- **Event Registration Page**: 
  - By clicking "Register," users are redirected to the event registration page. This page contains a form with the following fields:
    - Full name
    - Email
    - Date of birth
    - "Where did you hear about this event?"
  - Once the form is submitted, the data is stored in the database.

- **Event Participants Page**: 
  - Implemented a participants page where users can see a list of registered participants. This page is accessible by clicking the "View" button.

**Not completed**: ---

### Middle Level

**Completed:**

- Everything from the basic level.
- **Events Board Page**: 
  - Added the ability to sort events by title, event date, and organizer.
  
- **Event Registration Page**: 
  - Form validation is added (custom field validation rules).
  - Integrated a `DatePicker` for the date of birth input.
  
- **Event Participants Page**: 
  - Added search functionality, allowing users to search participants by full name or email.

**Not completed**: ---

### Advanced Level

**Completed:**

- Everything from the intermediate level.

**Not completed**: 

- Events board page: add infinite scroll pagination (when a user scrolls the page, it automatically loads more events).
- Event participants page: add line/bar chart displaying the amount of registrations per day for the given event.
- Implement a separate script that runs at a defined interval of time: it fetches the list of available events from a third-party API and stores them as events in your database. You can search for any free API available on the internet.
