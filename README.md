# PVP Interiors

A full-stack React and Node.js web application for an interior design portfolio. The application enables users to view the company portfolio, submit contact requests, and read/write client reviews. It features an integrated Admin Dashboard secured with Firebase Authentication.

## 🛠 Tech Stack
- **Frontend**: React.js, Vite, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: Firebase Authentication (Client) & Firebase Admin SDK (Server)
- **Styling**: Vanilla CSS

## ✨ Features
- **Dynamic Portfolio**: Attractive interface showcasing interior design works.
- **Client Reviews**: Website visitors can post reviews which are dynamically stored and displayed.
- **Contact Form**: Direct contact requests stored securely on the database.
- **Admin Dashboard**: Secured via Firebase. Allows authorized administrators to oversee contact submissions and client reviews.

## 🚀 Setup & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [MongoDB](https://www.mongodb.com/) Database URI
- A [Firebase](https://firebase.google.com/) Project

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Configure Environment Variables. You must export a Service Account JSON from Firebase to use the admin SDK. Create a `.env` file in the backend folder:
   ```env
   MONGO_URI="mongodburl"
   PORT=5000
   FIREBASE_SERVICE_ACCOUNT='{ "type": "service_account", "project_id": "...", "private_key": "...", ... }'
   ```
3. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
2. Locate your Firebase configuration from the Firebase console. Create a `.env` file in the frontend folder:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   VITE_API_BASE="http://localhost:5000/api"
   ```
   *(Note: The codebase may use hardcoded fallbacks inside `src/firebase.js`, but using `.env` is best practice).*

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🌍 Deployment

This project is fully prepared for CI/CD deployments:
- **Netlify (Frontend)**: Comes with a configured SPA `_redirects` file in the `public` directory to handle React Router smoothly. Ensure you set your `VITE_API_BASE` variable to your production backend URL in your deployment settings.
- **Render (Backend)**: Comes with a `start` script and parses Firebase credentials elegantly bridging Render's text-based environment variables.

## 📄 License
© PVP Interiors. All rights reserved.
