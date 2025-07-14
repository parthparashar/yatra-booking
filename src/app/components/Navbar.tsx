"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛫 YatraBooking
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className={`hover:text-blue-500 font-medium ${
              pathname === "/" ? "text-blue-300" : "text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-500 font-medium"
          >
            About
          </Link>
        </div>

        <button className="text-gray-600 hover:text-blue-500 text-xl md:hidden">
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
