import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", form);

      console.log("LOGIN SUCCESS:", data);

      login(data);
      nav("/dashboard");
    } catch (ex) {
      console.log("LOGIN ERROR:", ex);

      setErr(
        ex.response?.data?.message ||
          ex.message ||
          "Login failed"
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
          <h1 className="text-3xl font-bold">Login</h1>

          {err && <p className="text-red-600">{err}</p>}

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button disabled={loading} className="btn w-full" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            New user?{" "}
            <Link className="text-orange-600" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}