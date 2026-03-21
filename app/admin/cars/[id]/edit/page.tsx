"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Car } from "@/types";
import CarForm from "@/components/CarForm";

export default function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const [car, setCar] = useState<Car | null>(null);
  const [carId, setCarId] = useState("");

  useEffect(() => {
    params.then(async ({ id }) => {
      setCarId(id);
      const res = await apiFetch<{ data: Car }>(`/car/${id}`);
      setCar(res.data);
    });
  }, [params]);

  if (!car) return <p>Loading...</p>;
  return <CarForm mode="edit" carId={carId} initialValue={car} />;
}
