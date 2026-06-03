import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

const types = ["All", "Beach", "Mountains", "Heritage", "Nature", "Adventure", "Desert"];

const transportOptions = ["Any", "Bus", "Train", "Flight", "Car", "Bike"];

export default function Destinations() {
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState(false);

  const [filters, setFilters] = useState({
    place: "",
    type: "All",
    transportation: "Any",
    state: "",
    budget: "",
  });

  async function search(e) {
    e.preventDefault();
    setSearched(true);

    const { data } = await api.get("/features/destinations", {
      params: filters,
    });

    setItems(data);
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Custom Destination Finder</h1>

        <p className="text-slate-600 mt-2">
          Enter your own place, transportation, state, budget or travel style.
        </p>

        <form onSubmit={search} className="card mt-6 grid md:grid-cols-5 gap-3">
          <input
            className="input"
            placeholder="Place e.g. Ooty"
            value={filters.place}
            onChange={(e) => setFilters({ ...filters, place: e.target.value })}
          />

          <select
            className="input"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            className="input"
            value={filters.transportation}
            onChange={(e) =>
              setFilters({ ...filters, transportation: e.target.value })
            }
          >
            {transportOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <input
            className="input"
            placeholder="State e.g. Tamil Nadu"
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
          />

          <input
            className="input"
            type="number"
            placeholder="Max per-day budget"
            value={filters.budget}
            onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
          />

          <button className="btn md:col-span-5">Search</button>
        </form>

        {!searched && (
          <p className="text-slate-500 mt-6">
            Search using your own details to view matching destinations.
          </p>
        )}

        {searched && items.length === 0 && (
          <p className="text-slate-500 mt-6">
            No matching destination found. Try another place, transportation,
            state or budget.
          </p>
        )}

        <section className="grid md:grid-cols-3 gap-5 mt-6">
          {items.map((d) => (
            <div className="card" key={d.name}>
              <div className="text-4xl">{d.emoji}</div>

              <h2 className="text-xl font-bold mt-3">{d.name}</h2>

              <p className="text-slate-600">
                {d.state} • {d.type}
              </p>

              <p className="mt-2">
                🚍 Preferred Transport: {filters.transportation || "Any"}
              </p>

              <p className="mt-2">
                ⭐ {d.rating} • Best: {d.bestSeason}
              </p>

              <p className="font-semibold mt-2">
                From ₹{d.minBudget}/day • Recommended ₹{d.recommended}/day
              </p>

              {d.custom && (
                <p className="text-xs text-orange-600 mt-2">
                  Custom result generated from your search
                </p>
              )}
            </div>
          ))}
        </section>
      </main>
    </>
  );
}