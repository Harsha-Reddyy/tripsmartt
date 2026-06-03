import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Destinations from "./pages/Destinations";
import Stays from "./pages/Stays";
import Discounts from "./pages/Discounts";
import Expenses from "./pages/Expenses";
import Trips from "./pages/Trips";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/stays" element={<Stays />} />
      <Route path="/discounts" element={<Discounts />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}