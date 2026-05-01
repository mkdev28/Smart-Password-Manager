# PassOP - Password Manager 🔒

A full-stack, secure password manager built with the MERN stack (MongoDB, Express, React, Node.js). Transformed from a basic localhost app to a production-ready, multi-user system.

## 🚀 Features
- **Multi-user Authentication:** JWT-based login and registration.
- **Secure Password Storage:** Passwords are tied exclusively to user accounts (isolated data).
- **Password Strength Meter:** Real-time visual feedback on password complexity.
- **Strong Password Generator:** One-click generation of secure 16-character passwords.
- **Categories & Search:** Filter and search through your saved credentials instantly.
- **Clipboard Integration:** Copy usernames and passwords with a single click.
- **Responsive UI:** Clean, modern interface built with Custom CSS and Bootstrap 5.

## 🛠️ Tech Stack
- **Frontend:** React 18, React Router v6, Bootstrap 5, Custom CSS Variables
- **Backend:** Node.js, Express.js, MongoDB (Native Driver), JWT, bcryptjs
- **Architecture:** Decoupled Client-Server architecture with REST API

## 💻 Running Locally

### 1. Database Setup
Make sure you have MongoDB running locally, or have an Atlas connection string.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=mongodb://localhost:27017
DB_NAME=passop
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
CLIENT_URL=http://localhost:5173
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal.
```bash
npm install
```
Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:3000
```
Start the frontend:
```bash
npm run dev
```

## 🔐 Security Note
For this specific project version, stored user account passwords are cryptographically hashed using `bcrypt`. The actual vault passwords (credentials for other sites) are stored in plain text in the database for demonstration purposes. In a real-world scenario, these should be encrypted using AES or similar algorithms before insertion into the database.

---
PassOP &copy; 2025.
