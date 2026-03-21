"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Find your next ride",
    text: "Browse cars, check available rental time, and create your booking in a few clicks.",
    image: "/car-sample-1.svg"
  },
  {
    title: "Manage bookings easily",
    text: "Users can view, edit, and delete their own bookings. Admins can manage every booking in the system.",
    image: "/car-sample-2.svg"
  },
  {
    title: "Review after booking",
    text: "Ratings are shown on the car page, while rating submission happens on the bookings page after you have booked.",
    image: "/car-sample-3.svg"
  }
];

export default function HomeCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide) => (
          <section className="carousel-slide" key={slide.title}>
            <div className="carousel-copy">
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
              <div className="row" style={{ marginTop: 18 }}>
                <Link href="/cars" className="btn btn-primary">Browse cars</Link>
                <Link href="/register" className="btn btn-secondary">Create account</Link>
              </div>
            </div>
            <div className="carousel-image-box">
              <Image src={slide.image} alt={slide.title} width={520} height={320} className="carousel-image" priority />
            </div>
          </section>
        ))}
      </div>
      <div className="dots">
        {slides.map((slide, slideIndex) => (
          <div key={slide.title} className={`dot ${slideIndex === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
