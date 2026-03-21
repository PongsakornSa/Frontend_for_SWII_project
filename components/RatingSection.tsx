"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Rating } from "@/types";

export default function RatingSection({ carId }: { carId: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadRatings() {
    try {
      const res = await apiFetch<{ data: Rating[] }>(`/car/${carId}/ratings`);
      setRatings(res.data || []);
    } catch {
      setRatings([]);
    }
  }

  useEffect(() => {
    loadRatings();
  }, [carId]);

  async function submitRating(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await apiFetch(`/car/${carId}/ratings`, {
        method: "POST",
        auth: true,
        body: JSON.stringify({ rating, comment })
      });
      setMessage("Rating added");
      setComment("");
      setRating(5);
      loadRatings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot add rating");
    }
  }

  return (
    <div className="card">
      <h3>Ratings</h3>
      <form onSubmit={submitRating}>
        <label className="label">Score</label>
        <select className="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <label className="label">Comment</label>
        <textarea className="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="btn btn-primary" type="submit">Submit rating</button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      <div style={{ marginTop: 20 }}>
        {ratings.length === 0 ? <p className="muted">No ratings yet</p> : ratings.map((item) => (
          <div key={item._id} style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12, marginTop: 12 }}>
            <strong>{item.user?.name || "Anonymous"}</strong> - {item.rating}/5
            <p style={{ marginBottom: 0 }}>{item.comment || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
