import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Car Rental Frontend",
  description: "Frontend matching the uploaded backend"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          <main className="container page">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
