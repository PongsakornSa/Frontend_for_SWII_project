"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Rating } from "@/types";

export default function RatingSection({ carId }: { carId: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [error, setError] = useState("");

  async function loadRatings() {
    try {
      setError("");
      const res = await apiFetch<Rating[]>(`/car/${carId}/ratings`);
      setRatings(res.data || []);
    } catch (err) {
      setRatings([]);
      setError(err instanceof Error ? err.message : "Cannot load ratings");
    }
  }

  useEffect(() => {
    loadRatings();
  }, [carId]);

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Ratings & Comments</h3>

      {error && <div className="notice small">If ratings do not load, check the backend ratings route because the uploaded backend currently has unresolved merge markers in that route/controller.</div>}

      {ratings.length === 0 ? (
        <p className="muted">No ratings yet</p>
      ) : (
        ratings.map((item) => (
          <div key={item._id} className="rating-item">
            <strong>{item.user?.name || "Anonymous"}</strong> - {item.rating}/5
            <p style={{ marginBottom: 0 }}>{item.comment || "-"}</p>
          </div>
        ))
      )}
    </div>
  );
}
