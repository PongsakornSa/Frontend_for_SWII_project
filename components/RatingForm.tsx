"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function RatingForm({ carId, onSuccess }: { carId: string; onSuccess?: () => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitRating(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await apiFetch(`/car/${carId}/ratings`, {
        method: "POST",
        auth: true,
        body: JSON.stringify({ rating, comment })
      });
      setMessage("Rating added successfully");
      setRating(5);
      setComment("");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot add rating");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitRating} className="card">
      <h4 style={{ marginTop: 0 }}>Rate this car</h4>

      <label className="label">Score</label>
      <select className="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <label className="label">Comment</label>
      <textarea className="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />

      <button className="btn btn-primary" type="submit" style={{ marginTop: 16 }} disabled={loading}>
        {loading ? "Submitting..." : "Submit rating"}
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}
