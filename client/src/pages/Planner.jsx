import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { downloadTripPdf } from "../utils/pdf";

export default function Planner() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    source: "",
    destination: "",
    transportation: "",
    travelType: "",
    accommodation: "",
    budget: "",
    days: "",
    travelers: "",
    interests: "",
  });

  async function generate(e) {
    e.preventDefault();
    setError("");

    if (
      !form.source ||
      !form.destination ||
      !form.transportation ||
      !form.travelType ||
      !form.accommodation ||
      !form.budget ||
      !form.days ||
      !form.travelers ||
      !form.interests
    ) {
      setError("Please fill all fields. No default data is used.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        budget: Number(form.budget),
        days: Number(form.days),
        travelers: Number(form.travelers),
        interests: form.interests
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };

      const { data } = await api.post("/trips/generate", payload);
      setPlan(data.plan);
    } catch (ex) {
      setError(ex.response?.data?.message || "Unable to generate trip");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    await api.post("/trips", {
      title: `Trip to ${plan.destination}`,
      ...form,
      budget: Number(form.budget),
      days: Number(form.days),
      travelers: Number(form.travelers),
      interests: form.interests
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      plan,
    });

    alert("Trip saved");
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8">
        <form onSubmit={generate} className="card space-y-4">
          <h1 className="text-3xl font-bold">Custom Trip Planner</h1>

          <p className="text-slate-600">
            Enter your own travel details. The system will not use default names
            or preset trip details.
          </p>

          {error && <p className="text-red-600">{error}</p>}

          <input
            className="input"
            value={form.source}
            placeholder="Starting Location, e.g. Rajahmundry"
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />

          <input
            className="input"
            value={form.destination}
            placeholder="Destination, e.g. Ooty"
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <select
            className="input"
            value={form.transportation}
            onChange={(e) =>
              setForm({ ...form, transportation: e.target.value })
            }
          >
            <option value="">Select Transportation</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>

          <select
            className="input"
            value={form.travelType}
            onChange={(e) => setForm({ ...form, travelType: e.target.value })}
          >
            <option value="">Select Travel Type</option>
            <option value="Solo">Solo</option>
            <option value="Friends">Friends</option>
            <option value="Family">Family</option>
            <option value="Couple">Couple</option>
            <option value="Business">Business</option>
          </select>

          <select
            className="input"
            value={form.accommodation}
            onChange={(e) =>
              setForm({ ...form, accommodation: e.target.value })
            }
          >
            <option value="">Select Accommodation</option>
            <option value="Hostel">Hostel</option>
            <option value="PG">PG</option>
            <option value="Budget Hotel">Budget Hotel</option>
            <option value="Resort">Resort</option>
            <option value="Dharamshala">Dharamshala</option>
          </select>

          <input
            className="input"
            type="number"
            value={form.budget}
            placeholder="Total Budget in ₹"
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
          />

          <input
            className="input"
            type="number"
            value={form.days}
            placeholder="Number of Days"
            onChange={(e) => setForm({ ...form, days: e.target.value })}
          />

          <input
            className="input"
            type="number"
            value={form.travelers}
            placeholder="Number of Travelers"
            onChange={(e) => setForm({ ...form, travelers: e.target.value })}
          />

          <input
            className="input"
            value={form.interests}
            placeholder="Interests, e.g. nature, food, temples"
            onChange={(e) => setForm({ ...form, interests: e.target.value })}
          />

          <button disabled={loading} className="btn w-full">
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </form>

        <section className="card">
          {!plan ? (
            <p className="text-slate-500">
              Your generated trip appears here after you enter details.
            </p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">{plan.destination}</h2>

              <p className="text-slate-600 mt-2">{plan.summary}</p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  Transport: {form.transportation}
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  Travel Type: {form.travelType}
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  Accommodation: {form.accommodation}
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  Travelers: {form.travelers}
                </div>
              </div>

              <h3 className="font-bold mt-5">Budget</h3>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(plan.budgetBreakdown || {}).map(([k, v]) => (
                  <div className="bg-slate-50 p-3 rounded-xl" key={k}>
                    {k}: ₹{v}
                  </div>
                ))}
              </div>

              <h3 className="font-bold mt-5">Itinerary</h3>

              <div className="space-y-3 mt-2">
                {(plan.itinerary || []).map((d) => (
                  <div className="border rounded-xl p-3" key={d.day}>
                    <b>Day {d.day}</b>
                    <p>{d.morning}</p>
                    <p>{d.afternoon}</p>
                    <p>{d.evening}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={() => downloadTripPdf(plan)} className="btn">
                  PDF
                </button>

                {user && (
                  <button
                    onClick={save}
                    className="rounded-xl border px-5 py-3 font-semibold"
                  >
                    Save Trip
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}