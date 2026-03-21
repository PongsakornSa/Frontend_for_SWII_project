"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
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
      const res = await apiFetch<never>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          tel,
          email,
          password,
          role: "user"
        })
      });

      if (!res.token) throw new Error("Token not found");
      await setTokenAndRefresh(res.token);
      window.location.href = "/cars";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card form-card">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label className="label">Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="label">Telephone</label>
        <input className="input" value={tel} onChange={(e) => setTel(e.target.value)} required />

        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button className="btn btn-primary" style={{ marginTop: 16 }} disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
