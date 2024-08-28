## TraderTrack
Project Overview
TraderTrack is a web application designed to help traders manage and record their trades effectively. The application provides features for user authentication, trade logging, screenshot uploading, and viewing trade history. It is built using Node.js, Express, and MongoDB, with a frontend implemented using plain HTML, CSS, and JavaScript.

## Features
User Authentication: Secure login and registration system.
Trade Logging: Record detailed trade information including strategy, plan, amount, and risk management.
Screenshot Upload: Attach screenshots related to each trade.
Dashboard: View and manage past trades with search functionality.
Responsive Design: Adaptable UI for different screen sizes.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
File Uploads: multer for handling file uploads
Environment Management: dotenv for managing environment variables
CORS: cors for handling cross-origin requests
Architecture
## Backend
Node.js & Express: Provides RESTful API endpoints for authentication, trade management, and file uploads.
MongoDB: Used for storing user and trade data.
Multer: Handles file uploads for screenshots.
CORS: Configured to allow cross-origin requests from the frontend.
## Frontend
HTML/CSS/JavaScript: Simple and clean interface with forms for login, registration, and trade entry.
File Handling: JavaScript functions to handle file uploads and dynamic content rendering.
Getting Started
Prerequisites
Node.js and npm installed
MongoDB server running
A Google API key for authentication (if using Google Login)
Setup
Clone the Repository

## git clone https://github.com/Kinghope007/trade-discipline.git
cd tradertrack
Install Dependencies

npm install
Create a .env File

Create a .env file in the root directory and add the following environment variables:

env
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key

# Start the Server

npm start
The application will be available at http://localhost:3000.

Open the Application

Open your browser and navigate to http://localhost:3000 to access the TraderTrack application.

API Endpoints
Authentication
POST /auth/register: Register a new user
POST /auth/login: Log in an existing user
Trade Management
POST /daily/trades: Add a new trade (requires authentication)
GET /daily/trades: Retrieve all trades for the logged-in user (requires authentication)
Static Files
GET /dashboard: Serve the dashboard HTML page
GET /uploads/: Serve uploaded screenshot images
Usage

Acknowledgements
Thanks to ALX SE, Node.js, Express.js, MongoDB, and Multer for their excellent libraries and tools.