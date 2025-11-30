# DRIVE-TASK Project

This project contains a backend (Node.js/Express/TypeScript) and a frontend (React/Vite/TypeScript) for a file sharing and management system.

## Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## Backend Setup

1. **Install dependencies**
   ```powershell
   cd backend
   npm install
   ```

2. **Configure environment variables**
   - Create a `.env` file in the `backend` folder with:
     ```env
     JWT_SECRET=your_jwt_secret
     MONGODB_URI=mongodb://localhost:27017/test
     ```
   - Adjust `MONGODB_URI` if using a remote MongoDB.

3. **Start the backend server**
   ```powershell
   npm run dev
   ```
   - The backend will run on `http://localhost:5000` (or as configured).

---

## Frontend Setup

1. **Install dependencies**
   ```powershell
   cd frontend
   npm install
   ```

2. **Start the frontend development server**
   ```powershell
   npm run dev
   ```
   - The frontend will run on `http://localhost:5173` (or as configured by Vite).

---

## Usage
- Open the frontend URL in your browser.
- Register or login as a user.
- Use the dashboard to manage files and folders.
- Admin user: `Admin@gmail.com` (password: `admin@123` or `password`)

---

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check `.env` configuration for correct secrets and database URI.
- If you see duplicate email errors, make sure you are not registering the same email twice (case-insensitive).

---

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server (backend)

---

## Project Structure
- `backend/` — Express API server
- `frontend/` — React client app

---

## License
MIT
