# Drug Info App - Frontend

This is the frontend for the **Drug Info App**, built with React, TypeScript, and Material-UI. It provides a user-friendly interface for managing and viewing drug-related data.

## Features
- **DataGrid**: Displays drug data in a tabular format with filtering and pagination.
- **Autocomplete Filter**: Filter drugs by company.
- **Responsive Design**: Optimized for various screen sizes.
- **API Integration**: Fetches data from the backend.

## Tech Stack
- **React**: Frontend library for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript.
- **Material-UI (MUI)**: Provides pre-styled components.
- **Axios**: For making API requests.
- **Vite**: Development server and build tool.

## Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/monsund/drug-info-app.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd drug-info-app/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development
To start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Build
To create a production build:
```bash
npm run build
```
The build output will be in the `dist/` directory.

## Testing
To run tests:
```bash
npm test
```

## Environment Variables

Create a `.env` file in the `frontend` directory based on the `.env.example` file. The `.env.example` file contains placeholders for all required environment variables. For example:

```
VITE_API_BASE_URL=http://localhost:{BACKEND_PORT}/api
```

Ensure the `.env` file is not committed to version control by keeping it listed in `.gitignore`.

## Folder Structure
```
frontend/
├── src/
│   ├── api/          # API modules
│   ├── components/   # React components
│   ├── styles/       # Global styles
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── .env              # Environment variables
├── package.json      # Project metadata and scripts
└── vite.config.ts    # Vite configuration
```

## License
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Acknowledgments
- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)