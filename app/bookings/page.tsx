"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/types";
import RatingForm from "@/components/RatingForm";
import BookingEditForm from "@/components/BookingEditForm";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadBookings() {
    try {
      setError("");
      const res = await apiFetch<Booking[]>("/bookings", { auth: true });
      setBookings(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot load bookings");
    }
  }

  async function deleteBooking(id: string) {
    try {
      await apiFetch(`/bookings/${id}`, {
        method: "DELETE",
        auth: true
      });
      await loadBookings();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      <h1 className="section-title">My Bookings</h1>
      {error && <p className="error">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="booking-block">
          {bookings.map((booking) => (
            <div key={booking._id} className="card">
              <div className="space-between">
                <h3 style={{ margin: 0 }}>{booking.car?.name || "-"}</h3>
                <span className="badge">{booking.status}</span>
              </div>

              <p>Start: {new Date(booking.startRent).toLocaleString()}</p>
              <p>End: {new Date(booking.endRent).toLocaleString()}</p>
              <p>Total Price: ฿{booking.totalPrice}</p>

              <div className="booking-actions">
                <button className="btn btn-secondary" onClick={() => setEditingId(editingId === booking._id ? null : booking._id)}>
                  {editingId === booking._id ? "Close edit" : "Edit booking"}
                </button>
                <button className="btn btn-danger" onClick={() => deleteBooking(booking._id)}>
                  Delete booking
                </button>
              </div>

              {editingId === booking._id && (
                <div style={{ marginTop: 16 }}>
                  <BookingEditForm
                    booking={booking}
                    onSaved={async () => {
                      setEditingId(null);
                      await loadBookings();
                    }}
                  />
                </div>
              )}

              {booking.car?._id && (
                <div style={{ marginTop: 16 }}>
                  <RatingForm carId={booking.car._id} onSuccess={loadBookings} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
