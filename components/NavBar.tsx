"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { isLoggedIn, isAdmin, loading, logout, user } = useAuth();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-brand">Car Rental</Link>

        <nav className="nav-links">
          <Link href="/cars">Cars</Link>
          {isLoggedIn && <Link href="/bookings">My Bookings</Link>}
          {isAdmin && <Link href="/admin/bookings">Manage Bookings</Link>}
          {isAdmin && <Link href="/admin/cars/new">Add Car</Link>}

          {loading ? null : isLoggedIn ? (
            <>
              <span className="small muted" style={{ color: "#d1d5db" }}>
                {user?.name} ({user?.role})
              </span>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
