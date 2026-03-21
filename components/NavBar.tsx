"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearToken, getToken } from "@/lib/auth";

export default function NavBar() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  function logout() {
    clearToken();
    window.location.href = "/login";
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" style={{ fontWeight: 800 }}>Car Rental</Link>
        <nav className="nav-links">
          <Link href="/cars">Cars</Link>
          <Link href="/bookings">My Bookings</Link>
          <Link href="/admin/cars/new">Add Car</Link>
          {hasToken ? (
            <button className="btn btn-secondary" onClick={logout}>Logout</button>
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
