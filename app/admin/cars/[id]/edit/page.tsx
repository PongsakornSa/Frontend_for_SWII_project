"use client";

import { useEffect, useState } from "react";
import CarForm from "@/components/CarForm";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";

export default function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { isAdmin, loading } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [carId, setCarId] = useState("");
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <div className="notice">This page is for admin only.</div>;
  if (error) return <p className="error">{error}</p>;
  if (!car) return <p>Loading car...</p>;

  return <CarForm mode="edit" carId={carId} initialValue={car} />;
}
