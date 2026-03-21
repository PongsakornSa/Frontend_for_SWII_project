"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Booking } from "@/types";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  async function loadBookings() {
    try {
      const res = await apiFetch<{ data: Booking[] }>("/bookings", { auth: true });
      setBookings(res.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cannot load bookings");
    }
  }

  async function deleteBooking(id: string) {
    try {
      await apiFetch(`/bookings/${id}`, { method: "DELETE", auth: true });
      loadBookings();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      <h2>My bookings</h2>
      {error ? <p className="error">{error}</p> : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.car?.name || "-"}</td>
                  <td>{new Date(booking.startRent).toLocaleString()}</td>
                  <td>{new Date(booking.endRent).toLocaleString()}</td>
                  <td>{booking.status}</td>
                  <td>฿{booking.totalPrice}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteBooking(booking._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6}>No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
