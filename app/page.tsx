import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <h1>Rent a car with your backend API</h1>
        <p>
          This frontend is built to match your backend routes for authentication, car list,
          booking, and rating.
        </p>
        <div className="row" style={{ marginTop: 20 }}>
          <Link className="btn btn-primary" href="/cars">Browse cars</Link>
          <Link className="btn btn-secondary" href="/register">Create account</Link>
        </div>
      </section>
    </div>
  );
}
