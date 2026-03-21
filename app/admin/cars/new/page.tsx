"use client";

import CarForm from "@/components/CarForm";
import { useAuth } from "@/context/AuthContext";

export default function CreateCarPage() {
  const { isAdmin, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <div className="notice">This page is for admin only.</div>;
  return <CarForm mode="create" />;
}
