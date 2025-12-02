# Drug Info App - Backend

This is the backend for the **Drug Info App**, built with Node.js, Express, and MongoDB. It provides APIs for managing and retrieving drug-related data.

## Features
- **RESTful API**: Endpoints for CRUD operations on drug data.
- **MongoDB Integration**: Stores and retrieves data from a MongoDB database.
- **Environment Configuration**: Uses `.env` for sensitive data.
- **Error Handling**: Centralized error handling for API responses.

## Tech Stack
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing drug data.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: For managing environment variables.

## Prerequisites
- Node.js (v16 or higher)
- npm or pnpm
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/monsund/drug-info-app.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd drug-info-app/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory based on the `.env.example` file. The `.env.example` file contains placeholders for all required environment variables. For example:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/drug-info
PORT=4000
```

Ensure the `.env` file is not committed to version control by keeping it listed in `.gitignore`.

## Development
To start the development server:
```bash
npm run dev
```
The server will be available at `http://localhost:{PORT}`.

## Build
To transpile TypeScript (if applicable):
```bash
npm run build
```

## Testing
To run tests:
```bash
npm test
```

## Seeding the Database

To populate the database with initial drug data, use the `seedDrugs.js` script. This script reads data from the `src/data/drugData.json` file and inserts it into the MongoDB database.

### Steps to Seed the Database
1. Ensure your MongoDB instance is running and the `MONGODB_URI` is correctly set in your `.env` file.
2. Place your drug data in the `drugData.json` file in the appropriate directory (e.g., `backend/data/`).
3. Run the `seedDrugs.js` script:
   ```bash
   node src/seedDrugs.js
   ```

### Example `drugData.json` Format
```json
[
  {
    "code": "0001",
    "genericName": "Paracetamol",
    "brandName": "Tylenol",
    "company": "Pharma Inc.",
    "launchDate": "2025-01-01"
  },
  {
    "code": "0002",
    "genericName": "Ibuprofen",
    "brandName": "Advil",
    "company": "HealthCorp",
    "launchDate": "2025-02-01"
  }
]
```

This will insert the drug data into the database. Ensure the format matches the expected schema in your Mongoose model.

## Folder Structure
```
backend/
├── src/
│   ├── controllers/   # API controllers
│   ├── db/            # Database connection
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── index.ts       # Entry point
├── .env               # Environment variables
├── package.json       # Project metadata and scripts
└── tsconfig.json      # TypeScript configuration
```

## License
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Acknowledgments
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)