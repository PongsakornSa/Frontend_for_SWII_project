"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await apiFetch<{ token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, tel, email, password, role })
      });
      saveToken(res.token);
      window.location.href = "/cars";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Register failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 550, margin: "40px auto" }}>
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
        <label className="label">Role</label>
        <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button className="btn btn-primary" style={{ marginTop: 16 }}>Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
