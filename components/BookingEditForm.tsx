"use client";

import { FormEvent, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/types";

type Props = {
  booking: Booking;
  onSaved: () => void;
  allowStatusEdit?: boolean;
};

function toInputDate(value: string) {
  const date = new Date(value);
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
}

export default function BookingEditForm({ booking, onSaved, allowStatusEdit = false }: Props) {
  const [startRent, setStartRent] = useState(toInputDate(booking.startRent));
  const [endRent, setEndRent] = useState(toInputDate(booking.endRent));
  const [status, setStatus] = useState(booking.status || "renting");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const estimated = useMemo(() => {
    const hours = (new Date(endRent).getTime() - new Date(startRent).getTime()) / (1000 * 60 * 60);
    if (hours <= 0) return 0;
    return hours * (booking.car?.pricePerHour || 0);
  }, [startRent, endRent, booking.car]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const payload: Record<string, unknown> = {
        startRent,
        endRent,
        totalPrice: estimated
      };

      if (allowStatusEdit) {
        payload.status = status;
      }

      await apiFetch(`/bookings/${booking._id}`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(payload)
      });
      setMessage("Booking updated successfully");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot update booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h4 style={{ marginTop: 0 }}>Edit booking</h4>

      <label className="label">Start rent</label>
      <input className="input" type="datetime-local" value={startRent} onChange={(e) => setStartRent(e.target.value)} required />

      <label className="label">End rent</label>
      <input className="input" type="datetime-local" value={endRent} onChange={(e) => setEndRent(e.target.value)} required />

      {allowStatusEdit && (
        <>
          <label className="label">Status</label>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="renting">renting</option>
            <option value="returned">returned</option>
          </select>
        </>
      )}

      <p>Estimated total: <strong>฿{estimated.toFixed(2)}</strong></p>

      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save changes"}
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
