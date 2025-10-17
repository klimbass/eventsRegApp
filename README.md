# Event Registration App (Frontend)
A modern, responsive React application for event management with real-time features. Browse events, register participants, and view live statistics.
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-green)

## Overview
This application simulates user registration for various types of events. The events are randomly generated using a seed script. Each event has a title, a brief description, the event's date, and the organizer's information. Additionally, each event card includes two links: one for the participant registration form and another to view the list of all participants for that specific event.
On the main events page, pagination and sorting are implemented by three criteria: title, event date, and organizer. The registration form page includes validation for the user's input. The form checks for a minimum number of characters for the name, standard email validation, and limits the date of birth field to users who are at least 18 years old. A custom `DatePicker` component is used instead of the standard date input. Upon form submission, a React toast notification informs the user of either a successful registration or an error.
On the participant list page, a search feature is implemented, allowing users to search for participants by name or email from the list of those registered for the event.

## Live Demo

**Frontend**: [https://events-reg-app.vercel.app](https://events-reg-app.vercel.app)  
**Backend API**: [https://back-eventsregapp.onrender.com](https://back-eventsregapp.onrender.com)

## Screenshots

### Events Listing Page
![Events List](https://github.com/user-attachments/assets/a7aa049e-19eb-474c-9c4f-4d8cd2c1a795)

### Registration Form
![Registration Form](https://github.com/user-attachments/assets/9e659d0e-aea2-48a5-946c-c8d1d77ff1c3)

### Participants Management
![Participants Page](https://github.com/user-attachments/assets/de5bcd82-12cd-4351-bfe0-2da870ce7652)

### Event Details
![Events Detail Info](https://github.com/user-attachments/assets/6336b57d-ef95-4ed5-99be-8958bc9f89f1)

##  Features

### Core Functionality
- **Event Browsing** - Paginated list of available events
- **Smart Sorting** - Sort by title, date, or organizer
- **Advanced Search** - Find participants by name or email
- **Form Validation** - Client-side validation with custom DatePicker

### Real-time Features
- **Live Viewers Counter** - See how many people are viewing each event
- **WebSocket Integration** - Real-time updates without page refresh
- **Instant Updates** - Live participant count and event statistics

### User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface with smooth animations
- **Accessibility** - Keyboard navigation and screen reader friendly

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing and navigation
- **CSS Modules** - Scoped styling for components
- **Axios** - HTTP client for API requests

### Real-time Communication
- **WebSocket** - Bidirectional real-time communication
- **Custom Hooks** - `useWebSocket`, `useEventViewers` for live features

### Development & Deployment
- **Vercel** - Automatic deployments from GitHub
- **Environment Variables** - Secure configuration management

## Project Structure
```bash   
src/
├── components/ # Reusable UI components
│ ├── EventCard/ # Event display component
│ ├── Pagination/ # Pagination controls
│ ├── SortEventsBy/ # Sorting functionality
│ └── EventViewerCounter/ # Live viewers display
├── hooks/ # Custom React hooks
│ ├── useWebSocket.js # WebSocket connection management
│ └── useEventViewers.js # Live viewers tracking
├── pages/ # Route components
│ ├── HomePage/ # Main events listing
│ ├── RegisterPage/ # Event registration form
│ └── ParticipantsPage/ # Participants list
├── config/ # Configuration files
│ └── constants.js # API URLs and settings
└── App.jsx # Main application component
```

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
  git clone https://github.com/klimbass/eventsRegApp.git
  cd eventsRegApp
```
### Install dependencies
```
 npm install
```
### Environment Setup
 Create .env local file:
- VITE_API_URL=http://localhost:3000
- VITE_WS_URL=ws://localhost:3000

### Start development server
```
 npm run dev
```
App will be available at http://localhost:5173

### Building for Production
```
  npm run build
  npm run preview
```

## API Integration

### Endpoints
 - GET /events - Fetch paginated events list
 - POST /events/:id/register - Register for an event
 - GET /events/:id/participants - Get event participants  

### WebSocket Events
 - **VIEWING_EVENT** - Track user viewing an event
 - **LEFT_EVENT** - Track user leaving an event
 - **VIEWER_COUNT_UPDATE** - Live viewers count updates

## Key Components
### EventViewerCounter
  Displays real-time viewer count using WebSocket connection:
  ```
  <EventViewerCounter eventId="event123" />
    // Shows: 5 people viewing
  ```
### Custom Hooks
 - **useWebSocket** - Manages WebSocket connection and reconnection
 - **useEventViewers** - Tracks and displays live viewer statistics

## Deployment
   The application is automatically deployed to Vercel on every push to main branch.

### Environment Variables for Production
 - **VITE_API_URL** - Backend API URL
 - **VITE_WS_URL** - WebSocket server URL

## Contributing
 - Fork the repository
 - Create your feature branch (git checkout -b feature/amazing-feature)
 - Commit your changes (git commit -m 'Add amazing feature')
 - Push to the branch (git push origin feature/amazing-feature)
 - Open a Pull Request

## License
  This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Alex Klimov** - Full-Stack Developer

-  **LinkedIn**: [link](https://www.linkedin.com/in/oleksandr-klimov-developer/)
-  **GitHub**: [link](https://github.com/klimbass)
-  **Email**: oleksandr.klimov@web.de

## Acknowledgments
 - **React team** for amazing framework
 - **Vercel** for seamless deployment
 - **Render** for reliable backend hosting
