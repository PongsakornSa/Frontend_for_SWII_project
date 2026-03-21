"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";

type Props = {
  initialValue?: Partial<Car>;
  mode: "create" | "edit";
  carId?: string;
};

export default function CarForm({ initialValue, mode, carId }: Props) {
  const [name, setName] = useState(initialValue?.name || "");
  const [address, setAddress] = useState(initialValue?.address || "");
  const [tel, setTel] = useState(initialValue?.tel || "");
  const [pricePerHour, setPricePerHour] = useState(String(initialValue?.pricePerHour || ""));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = { name, address, tel, pricePerHour: Number(pricePerHour) };
      if (mode === "create") {
        await apiFetch("/car", {
          method: "POST",
          auth: true,
          body: JSON.stringify(payload)
        });
        setMessage("Car created successfully");
      } else {
        await apiFetch(`/car/${carId}`, {
          method: "PUT",
          auth: true,
          body: JSON.stringify(payload)
        });
        setMessage("Car updated successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  }

  async function onDelete() {
    if (!carId) return;
    try {
      await apiFetch(`/car/${carId}`, { method: "DELETE", auth: true });
      window.location.href = "/cars";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>{mode === "create" ? "Create new car" : "Edit car"}</h2>
      <form onSubmit={onSubmit}>
        <label className="label">Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        <label className="label">Address</label>
        <textarea className="textarea" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <label className="label">Telephone</label>
        <input className="input" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <label className="label">Price per hour</label>
        <input className="input" type="number" min="0" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} required />
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn btn-primary" type="submit">Save</button>
          {mode === "edit" && <button className="btn btn-danger" type="button" onClick={onDelete}>Delete</button>}
        </div>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
