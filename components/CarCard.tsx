import Link from "next/link";
import { Car } from "@/types";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="card">
      <div className="space-between">
        <h3 style={{ margin: 0 }}>{car.name}</h3>
        <span className="badge">฿{car.pricePerHour}/hour</span>
      </div>
      <p className="muted">{car.address}</p>
      <p>Tel: {car.tel}</p>
      <p>
        Rating: {Number(car.averageRating || 0).toFixed(1)} ({car.ratingCount || 0})
      </p>
      <Link className="btn btn-primary" style={{ display: "inline-block", marginTop: 8 }} href={`/cars/${car._id}`}>
        View details
      </Link>
    </div>
  );
}
