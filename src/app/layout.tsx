import Navbar from "./components/Navbar";
import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Yatra Booking",
  description: "Hotel booking made simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}