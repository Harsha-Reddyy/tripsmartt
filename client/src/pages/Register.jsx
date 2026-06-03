import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", form);

      console.log("REGISTER SUCCESS:", data);

      login(data);

      nav("/dashboard");
    } catch (err) {
      console.log("REGISTER ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed"
      );

      alert(
        err.response?.data?.message ||
          err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto py-12 px-4">
        <form onSubmit={submit} className="card space-y-4">
          <h1 className="text-3xl font-bold">Create Account</h1>

          {error && <p className="text-red-600">{error}</p>}

          <input
            className="input"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button disabled={loading} className="btn w-full" type="submit">
            {loading ? "Registering..." : "Register"}
          </button>

          <p>
            Already registered?{" "}
            <Link className="text-orange-600" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}