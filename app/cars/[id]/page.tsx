"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";
import BookingForm from "@/components/BookingForm";
import RatingSection from "@/components/RatingSection";
import Link from "next/link";

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState("");
  const [carId, setCarId] = useState("");

  useEffect(() => {
    params.then(async ({ id }) => {
      setCarId(id);
      try {
        const res = await apiFetch<{ data: Car }>(`/car/${id}`);
        setCar(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Cannot load car");
      }
    });
  }, [params]);

  if (error) return <p className="error">{error}</p>;
  if (!car) return <p>Loading...</p>;

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
      <div className="card">
        <div className="space-between">
          <h1 style={{ margin: 0 }}>{car.name}</h1>
          <span className="badge">฿{car.pricePerHour}/hour</span>
        </div>
        <p>{car.address}</p>
        <p>Tel: {car.tel}</p>
        <p>Average rating: {Number(car.averageRating || 0).toFixed(1)}</p>
        <div className="row">
          <Link className="btn btn-secondary" href={`/admin/cars/${car._id}/edit`}>Edit car</Link>
        </div>
      </div>
      <BookingForm car={car} />
      <div style={{ gridColumn: "1 / -1" }}>
        <RatingSection carId={carId} />
      </div>
    </div>
  );
}
