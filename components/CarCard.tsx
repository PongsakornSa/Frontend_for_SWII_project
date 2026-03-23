import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types";

export default function CarCard({
  car,
  canEdit,
}: {
  car: Car;
  canEdit?: boolean;
}) {
  return (
    <div className="card car-card">
      <div className="car-card-image-wrap">
        <Image
          src={`/${car.name}.png`}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="car-card-image"
        />
      </div>

      <div className="car-card-content">
        <div className="car-card-header">
          <h3 className="car-card-title">{car.name}</h3>
          <span className="badge">฿{car.pricePerHour}/hour</span>
        </div>

        <div className="car-card-info">
          <p className="car-card-address">{car.address}</p>
          <p className="car-card-text">Tel: {car.tel}</p>
          <p className="car-card-text">
            Rating: {Number(car.averageRating || 0).toFixed(1)} ({car.ratingCount || 0})
          </p>
        </div>

        <div className="booking-actions car-card-actions">
          <Link className="btn btn-primary" href={`/cars/${car._id}`}>
            View details
          </Link>

          {canEdit && (
            <Link className="btn btn-secondary" href={`/admin/cars/${car._id}/edit`}>
              Edit car
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}