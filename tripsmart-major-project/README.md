# TripSmart AI - 4th Year Major Project

A real-world full-stack AI travel planning and budget optimization system.

## Features

- User signup/login with JWT
- MongoDB database
- Save, view, and delete trips
- AI/rule-based itinerary generation
- Budget optimization
- Weather API integration ready
- Admin dashboard for destinations/hotels/users
- PDF trip report export
- Responsive React UI
- Separate deployable frontend and backend

## Tech Stack

Frontend: React, Vite, Tailwind CSS, React Router, Axios, jsPDF  
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
Deployment: Vercel for frontend, Render/Railway for backend

## Folder Structure

```text
client/   React frontend
server/   Express backend
```

## Local Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=optional_openai_key
OPENWEATHER_API_KEY=optional_weather_key
CLIENT_URL=http://localhost:5173
```

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Deploy

### Backend on Render

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add backend environment variables

### Frontend on Vercel

- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Add:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

## Demo Accounts After Seed

Admin:
- admin@tripsmart.ai
- admin123

User:
- user@tripsmart.ai
- user123

## Project Title

TripSmart AI: Intelligent Travel Planning and Budget Optimization System
