# BetaHouse Frontend

The BetaHouse Frontend is the user-facing portion of the BetaHouse real estate platform. It enables users to browse available properties, filter results by multiple parameters, and authenticate securely. The application integrates with a Node.js backend and provides a responsive experience across desktop and mobile.

---

## Overview

The primary goals of the BetaHouse frontend are:

- Display a list of properties from the backend API.
- Allow users to search by location, property type, and number of bedrooms.
- Support sorting and pagination.
- Enable user registration and authentication.
- Ensure a clean and user-friendly interface.

The application is built with React and communicates with the backend API using Axios.

---

## Key Features

### Property Search and Filtering

The frontend allows property filtering by:

- Location (state/city/area/address)
- Property type
- Bedrooms (exact match)
- Sorting by price (ascending/descending) or newest listings
- Pagination

### Authentication

Supports:

- User registration
- User login
- Local storage session persistence

### UI/UX

- Fully responsive layout
- Desktop and mobile navigation
- Disabled inactive navigation links
- Clickable logo that returns users to the homepage
- Minimal and intuitive interface

### API Communication

- Fetches data from backend `/properties` and `/search` endpoints
- Sends search parameters dynamically
- Handles loading states and empty results gracefully

---

## Technology Stack

- React
- React Router
- Axios
- CSS
- Vite (bundler)

---

## Folder Structure

```
src/
  api/
    axios.js
  components/
    Header
    Hero
    Footer
    Pagination
    PropertyCard
  pages/
    Home
    Properties
    Auth
      SignIn
      SignUp
  data/
  App.jsx
  main.jsx
```

---

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- Backend server running at `http://localhost:5000`

### Installation

```
git clone <repository-url>
cd betahouse-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set:

### Running Locally

```
npm run dev
```

### Building for Production

```
npm run build
```

---

## API Endpoints Used

| Endpoint          | Method | Purpose           |
| ----------------- | ------ | ----------------- |
| `/properties`     | GET    | Get property list |
| `/search`         | GET    | Search properties |
| `/properties/:id` | GET    | Single property   |
| `/auth/login`     | POST   | Authenticate user |
| `/auth/register`  | POST   | Create a new user |

---

## Pagination & Search Logic Workflow

The frontend determines whether to query `/properties` or `/search` based on the search values provided. If no filters are applied, `/properties` is used. If filters exist, queries are sent to `/search`.

---

---

## Contributing

Contributions are welcome. Developers may propose improvements through pull requests or open issues.

---

## Support

For bugs, issues, or feature requests, open an issue in the repository.

---
