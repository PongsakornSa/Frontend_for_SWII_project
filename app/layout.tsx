import "./globals.css";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Rental Frontend",
  description: "Frontend for the provided backend"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="container page">{children}</main>
      </body>
    </html>
  );
}
