# AI Safety Incident Dashboard

A modern web application for managing and reporting AI safety incidents. Built with React, TypeScript, and Material-UI.

## Features

- View a list of AI safety incidents with their details
- Filter incidents by severity (Low, Medium, High)
- Sort incidents by date (Newest First, Oldest First)
- Expand/collapse incident details
- Report new incidents with title, description, and severity
- Responsive design that works on all screen sizes

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- date-fns

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
  ├── components/
  │   ├── IncidentList.tsx    # Component for displaying and filtering incidents
  │   └── ReportIncidentForm.tsx  # Form for submitting new incidents
  ├── data/
  │   └── mockData.ts         # Mock data for incidents
  ├── types/
  │   └── index.ts           # TypeScript type definitions
  ├── App.tsx                # Main application component
  └── main.tsx              # Application entry point
```

## Design Decisions

- Used Material-UI for a consistent and professional look
- Implemented responsive design using MUI's Grid system
- Used TypeScript for better type safety and developer experience
- Implemented local state management using React's useState and useMemo
- Added form validation for the incident report form
- Used date-fns for consistent date formatting

## Future Improvements

- Add authentication system
- Implement persistent storage (database)
- Add search functionality
- Add incident categories/tags
- Implement user roles and permissions
- Add incident status tracking
- Add export functionality for incident reports
