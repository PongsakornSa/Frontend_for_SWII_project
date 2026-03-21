"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Booking, User } from "@/types";
import BookingEditForm from "@/components/BookingEditForm";

export default function AdminBookingsPage() {
  const { isAdmin, loading } = useAuth();
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
        auth: true,
      });
      await loadBookings();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  useEffect(() => {
    if (isAdmin) loadBookings();
  }, [isAdmin]);

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <div className="notice">This page is for admin only.</div>;

  return (
    <div>
      <h1 className="section-title">Admin Booking Management</h1>
      {error && <p className="error">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="booking-block">
          {bookings.map((booking) => {
            const bookingUser =
              typeof booking.user === "object" && booking.user !== null
                ? (booking.user as User)
                : null;

            const bookingUserName =
              bookingUser?.name ||
              (typeof booking.user === "string" ? booking.user : "-");

            return (
              <div key={booking._id} className="card">
                <div className="space-between">
                  <h3 style={{ margin: 0 }}>{booking.car?.name || "-"}</h3>
                  <span className="badge badge-dark">{booking.status}</span>
                </div>

                <p>User: {bookingUserName}</p>
                <p>Start: {new Date(booking.startRent).toLocaleString()}</p>
                <p>End: {new Date(booking.endRent).toLocaleString()}</p>
                <p>Total Price: ฿{booking.totalPrice}</p>

                <div className="booking-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      setEditingId(editingId === booking._id ? null : booking._id)
                    }
                  >
                    {editingId === booking._id ? "Close edit" : "Edit booking"}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete booking
                  </button>
                </div>

                {editingId === booking._id && (
                  <div style={{ marginTop: 16 }}>
                    <BookingEditForm
                      booking={booking}
                      allowStatusEdit
                      onSaved={async () => {
                        setEditingId(null);
                        await loadBookings();
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}