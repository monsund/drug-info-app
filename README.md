# Drug Info App

The **Drug Info App** is a full-stack application designed to manage and display drug-related data. It consists of a backend built with Node.js, Express, and MongoDB, and a frontend built with React, TypeScript, and Material-UI.

## Project Structure
- [Frontend](./frontend/README.md): The user interface for managing and viewing drug data.
- [Backend](./backend/README.md): The server-side API for handling data storage and retrieval.

## Live URLs
- **Frontend**: [https://drug-info-app-two.vercel.app](https://drug-info-app-two.vercel.app)
- **Backend**: [https://drug-info-app.onrender.com](https://drug-info-app.onrender.com)

## Features
- **Frontend**: Interactive UI with filtering, pagination, and responsive design.
- **Backend**: RESTful API with MongoDB integration.

## Getting Started
Refer to the individual README files for setup instructions:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## Running the App Locally

To run the app locally, make sure the following ports are available:
- **Port 5000**: Used for the frontend (configured in `vite.config.ts`). Otherwise it will throw CORS error.
- **Port 4000**: Used for the backend.

If these ports are occupied, you can change them in the respective `.env` files for the frontend and backend.