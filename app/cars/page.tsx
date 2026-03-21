"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";
import CarCard from "@/components/CarCard";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [startRent, setStartRent] = useState("");
  const [endRent, setEndRent] = useState("");

  async function loadCars() {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (startRent) params.set("startRent", startRent);
      if (endRent) params.set("endRent", endRent);
      const query = params.toString() ? `?${params.toString()}` : "";
      const res = await apiFetch<{ data: Car[] }>(`/car${query}`);
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
      <div className="card" style={{ marginBottom: 20 }}>
        <h2>Find available cars</h2>
        <div className="row">
          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="label">Start rent</label>
            <input className="input" type="datetime-local" value={startRent} onChange={(e) => setStartRent(e.target.value)} />
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <label className="label">End rent</label>
            <input className="input" type="datetime-local" value={endRent} onChange={(e) => setEndRent(e.target.value)} />
          </div>
        </div>
        <div className="row" style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={loadCars}>Search</button>
          <button className="btn btn-secondary" onClick={() => { setStartRent(""); setEndRent(""); }}>Clear</button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : error ? <p className="error">{error}</p> : (
        <div className="grid">
          {cars.map((car) => <CarCard key={car._id} car={car} />)}
        </div>
      )}
    </div>
  );
}
