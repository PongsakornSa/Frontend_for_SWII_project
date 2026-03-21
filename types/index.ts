export type UserRole = "user" | "admin";

export type User = {
  _id: string;
  name: string;
  tel: string;
  email: string;
  role: UserRole;
};

export type Car = {
  _id: string;
  name: string;
  address: string;
  tel: string;
  pricePerHour: number;
  averageRating?: number;
  ratingCount?: number;
};

export type BookingStatus = "renting" | "returned" | string;

export type Booking = {
  _id: string;
  startRent: string;
  endRent: string;
  totalPrice: number;
  status: "renting" | "returned";
  car: Car;
  user?: string | User; 
};

export type Rating = {
  _id: string;
  rating: number;
  comment?: string;
  user?: {
    _id?: string;
    name?: string;
  };
  createdAt?: string;
};
