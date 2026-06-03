import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              TripSmart AI: Personalized Travel Planner
            </h1>

            <p className="mt-5 text-slate-600 text-lg">
              Create a trip using your own starting city, destination, budget,
              days, travelers and interests. Login is required before using
              planner, destination search, stays, discounts, expenses and saved
              trips.
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <Link className="btn" to={user ? "/planner" : "/login"}>
                {user ? "Generate Trip" : "Login to Start"}
              </Link>

              <Link
                className="rounded-xl border px-5 py-3 font-semibold"
                to={user ? "/destinations" : "/register"}
              >
                {user ? "Search Destinations" : "Create Account"}
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Project Highlights</h2>
            <ul className="space-y-3 text-slate-700">
              <li>✅ User-provided trip details</li>
              <li>✅ Login-protected features</li>
              <li>✅ Custom destination search</li>
              <li>✅ Budget stays and student discounts</li>
              <li>✅ Group expense splitter</li>
              <li>✅ Saved trips and PDF export</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}