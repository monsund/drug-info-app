# Drug Info App - Backend

This is the backend for the **Drug Info App**, built with Node.js, Express, and MongoDB. It provides APIs for managing and retrieving drug-related data.

## Live URL

The backend is deployed and accessible at:
[https://drug-info-app.onrender.com](https://drug-info-app.onrender.com)

## Endpoints

### GET Endpoints

1. **Health Check**
   - **URL**: `/`
   - **Description**: Returns the status of the backend server.
   - **Response**:
     ```json
     {
       "status": "drug-info backend server is running"
     }
     ```

2. **Drug Information**
   - **URL**: `/api/drugs`
   - **Description**: Fetches a list of drugs from the database.
   - **Response**: Array of drug objects.
     ```json
     [
       {
         "code": "0006-0568",
         "genericName": "vorinostat",
         "company": "Merck Sharp & Dohme Corp.",
         "brandName": "ZOLINZA",
         "launchDate": "2004-02-14T23:01:10Z"
       },
       {
         "code": "68828-192",
         "genericName": "Avobenzone, Octinoxate, Octisalate, Octocrylene",
         "company": "Jafra cosmetics International",
         "brandName": "CC Cream Complexion Corrector Medium Dark Broad Spectrum SPF 15",
         "launchDate": "2011-02-02T08:57:26Z"
       }
     ]
     ```

3. **Table Configuration**
   - **URL**: `/api/table-config`
   - **Description**: Fetches the table configuration for the drug data from the configuration file.
   - **Response**: JSON object containing table configuration.
     ```json
     [
       { "key": "id", "label": "Id" },
       { "key": "code", "label": "Code" },
       { "key": "name", "label": "Name" },
       { "key": "company", "label": "Company" },
       { "key": "launchDate", "label": "Launch Date" }
     ]
     ```

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
│   ├── seedDrugs.js   # Script to seed the database
│   └── index.ts       # Entry point
├── .env               # Environment variables
├── package.json       # Project metadata and scripts
└── tsconfig.json      # TypeScript configuration
```
