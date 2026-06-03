import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-600">TripSmart AI</Link>
        <div className="flex gap-4 items-center flex-wrap">
          {user && <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/planner">Planner</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/stays">Stays</Link>
            <Link to="/discounts">Discounts</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/trips">My Trips</Link>
            {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          </>}
          {user ? <button onClick={logout} className="btn py-2">Logout</button> : <Link className="btn py-2" to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
