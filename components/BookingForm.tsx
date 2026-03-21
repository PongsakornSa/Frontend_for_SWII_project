"use client";

import { FormEvent, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";

export default function BookingForm({ car }: { car: Car }) {
  const [startRent, setStartRent] = useState("");
  const [endRent, setEndRent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const estimatedPrice = useMemo(() => {
    if (!startRent || !endRent) return 0;
    const start = new Date(startRent).getTime();
    const end = new Date(endRent).getTime();
    const hours = (end - start) / (1000 * 60 * 60);
    if (hours <= 0) return 0;
    return hours * car.pricePerHour;
  }, [startRent, endRent, car.pricePerHour]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await apiFetch(`/cars/${car._id}/bookings`, {
        method: "POST",
        auth: true,
        body: JSON.stringify({ startRent, endRent })
      });
      setMessage("Booking created successfully");
      setStartRent("");
      setEndRent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot create booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Book this car</h3>
      <label className="label">Start rent</label>
      <input className="input" type="datetime-local" value={startRent} onChange={(e) => setStartRent(e.target.value)} required />
      <label className="label">End rent</label>
      <input className="input" type="datetime-local" value={endRent} onChange={(e) => setEndRent(e.target.value)} required />
      <p>Estimated price: <strong>฿{estimatedPrice.toFixed(2)}</strong></p>
      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Booking..." : "Confirm booking"}
      </button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
