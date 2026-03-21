"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";
import CarCard from "@/components/CarCard";
import { useAuth } from "@/context/AuthContext";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startRent, setStartRent] = useState("");
  const [endRent, setEndRent] = useState("");
  const { isAdmin } = useAuth();

  async function loadCars() {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (startRent) params.set("startRent", startRent);
      if (endRent) params.set("endRent", endRent);
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await apiFetch<Car[]>(`/car${query}`);
      setCars(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot load cars");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <div>
      <h1 className="section-title">Cars</h1>

      <div className="card" style={{ marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>Check available cars</h3>
        <div className="row">
          <div style={{ flex: 1, minWidth: 220 }}>
            <label className="label">Start rent</label>
            <input className="input" type="datetime-local" value={startRent} onChange={(e) => setStartRent(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <label className="label">End rent</label>
            <input className="input" type="datetime-local" value={endRent} onChange={(e) => setEndRent(e.target.value)} />
          </div>
        </div>

        <div className="booking-actions">
          <button className="btn btn-primary" onClick={loadCars}>Search</button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setStartRent("");
              setEndRent("");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} canEdit={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
