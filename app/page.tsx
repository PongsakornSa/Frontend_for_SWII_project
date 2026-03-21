import HomeCarousel from "@/components/HomeCarousel";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>Car rental system demo</h1>
        <p>
          This frontend includes registration, login, car browsing, booking creation, booking validation,
          user booking management, admin booking management, and car review display.
        </p>
      </section>

      <HomeCarousel />

      
    </div>
  );
}
