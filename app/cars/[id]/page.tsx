"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";
import BookingCreateForm from "@/components/BookingCreateForm";
import RatingSection from "@/components/RatingSection";
import { useAuth } from "@/context/AuthContext";

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [car, setCar] = useState<Car | null>(null);
  const [carId, setCarId] = useState("");
  const [error, setError] = useState("");
  const { isAdmin, isLoggedIn } = useAuth();

  useEffect(() => {
    params.then(async ({ id }) => {
      setCarId(id);
      try {
        const res = await apiFetch<Car>(`/car/${id}`);
        setCar(res.data || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Cannot load car");
      }
    });
  }, [params]);

  if (error) return <p className="error">{error}</p>;
  if (!car) return <p>Loading...</p>;

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.15fr .85fr" }}>
      <div className="card">
        <div className="space-between">
          <h1 style={{ margin: 0 }}>{car.name}</h1>
          <span className="badge">฿{car.pricePerHour}/hour</span>
        </div>
        <p>{car.address}</p>
        <p>Tel: {car.tel}</p>
        <p>Average rating: {Number(car.averageRating || 0).toFixed(1)} ({car.ratingCount || 0})</p>

        <div className="booking-actions">
          {isLoggedIn && <Link className="btn btn-secondary" href="/bookings">Go to My Bookings</Link>}
          {isAdmin && <Link className="btn btn-secondary" href={`/admin/cars/${car._id}/edit`}>Edit car</Link>}
        </div>
      </div>

      <BookingCreateForm car={car} />

      <div style={{ gridColumn: "1 / -1" }}>
        <RatingSection carId={carId} />
      </div>
    </div>
  );
}
