"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTokenAndRefresh } = useAuth();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiFetch<never>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (!res.token) throw new Error("Token not found");
      await setTokenAndRefresh(res.token);
      window.location.href = "/cars";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card form-card">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button className="btn btn-primary" style={{ marginTop: 16 }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
