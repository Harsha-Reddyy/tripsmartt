import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Planner from './pages/Planner.jsx';
import Trips from './pages/Trips.jsx';
import Admin from './pages/Admin.jsx';
import Destinations from './pages/Destinations.jsx';
import Stays from './pages/Stays.jsx';
import Discounts from './pages/Discounts.jsx';
import Expenses from './pages/Expenses.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function Protected({ children }) { const { user } = useAuth(); return user ? children : <Navigate to="/login" />; }

createRoot(document.getElementById('root')).render(
  <BrowserRouter><AuthProvider><Routes>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
    <Route path="/planner" element={<Planner />} />
    <Route path="/destinations" element={<Destinations />} />
    <Route path="/stays" element={<Stays />} />
    <Route path="/discounts" element={<Discounts />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/trips" element={<Protected><Trips /></Protected>} />
    <Route path="/admin" element={<Protected><Admin /></Protected>} />
  </Routes></AuthProvider></BrowserRouter>
);
