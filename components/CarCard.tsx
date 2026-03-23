import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types";

export default function CarCard({ car, canEdit }: { car: Car; canEdit?: boolean }) {
  return (
    <div className="card">
      
      <div className="space-between" style={{ alignItems: "center" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image
            src={`/${car.name}.png`}
            alt={car.name}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <h3 style={{ margin: 0 }}>{car.name}</h3>
        </div>

        <span className="badge">฿{car.pricePerHour}/hour</span>
      </div>

      <p className="muted">{car.address}</p>
      <p>Tel: {car.tel}</p>
      <p>
        Rating: {Number(car.averageRating || 0).toFixed(1)} ({car.ratingCount || 0})
      </p>

      <div className="booking-actions">
        <Link className="btn btn-primary" href={`/cars/${car._id}`}>View details</Link>
        {canEdit && <Link className="btn btn-secondary" href={`/admin/cars/${car._id}/edit`}>Edit car</Link>}
      </div>
    </div>
  );
}