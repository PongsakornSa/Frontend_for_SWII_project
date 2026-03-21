export type User = {
  _id: string;
  name: string;
  tel: string;
  email: string;
  role: "user" | "admin";
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

export type Booking = {
  _id: string;
  startRent: string;
  endRent: string;
  totalPrice: number;
  status: "renting" | "returned";
  car: Car;
  user?: string;
};

export type Rating = {
  _id: string;
  rating: number;
  comment?: string;
  user?: {
    _id?: string;
    name?: string;
  };
  car?: string;
  createdAt?: string;
};
