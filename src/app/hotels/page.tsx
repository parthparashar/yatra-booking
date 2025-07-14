"use client";

import { useSearchParams } from "next/navigation";
import hotels from "@/app/mockData/hotels";
import { Suspense, useEffect, useState } from "react";
import { Hotel } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const HotelResultsPage = () => {
  const searchParams = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  const city = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "1";

  const nightCount =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  useEffect(() => {
    if (city) {
      const result = hotels.filter(
        (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
      );
      setFilteredHotels(result);
    }
  }, [city]);

  return (
    <div className="bg-[#f7fafd] min-h-screen px-4 md:px-16 py-10">
      <div className="mb-6 text-sm text-blue-600 font-medium">
        <Link href="/">&#8592; Back to Search</Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#002B5B]">
            Hotels in {city}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {checkIn} - {checkOut} • {guests} Guest{guests !== "1" && "s"}
          </p>
        </div>
        <div className="bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-1 rounded-full mt-4 md:mt-0">
          {filteredHotels.length} hotel{filteredHotels.length !== 1 && "s"}{" "}
          found
        </div>
      </div>

      {filteredHotels.length === 0 ? (
        <p className="text-center text-gray-500">No hotels found.</p>
      ) : (
        filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mb-6"
          >
            <div className="md:w-2/5 h-64 relative">
              <Image
                src="/hotel-room.jpeg"
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between md:w-3/5">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="md:pr-6 w-full">
                  <h2 className="text-xl md:text-2xl font-bold text-[#002B5B] mb-1">
                    {hotel.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">📍 {hotel.city}</p>
                  <p className="text-gray-700 text-sm mb-3">
                    {hotel.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {hotel.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0 w-full md:w-auto">
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(Math.round(hotel.rating)) +
                      "☆".repeat(5 - Math.round(hotel.rating))}
                    <span className="text-gray-600 ml-2">({hotel.rating})</span>
                  </div>
                  <p className="text-xl font-bold mt-2 text-black">
                    ₹{hotel.price}
                  </p>
                  <p className="text-sm text-gray-500">per night</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Total: ₹{hotel.price * nightCount} for {nightCount} night
                    {nightCount !== 1 && "s"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Link
                  href={`/hotels/${hotel.id}`}
                  className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-md hover:opacity-90 text-sm"
                >
                  👁️ View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default function HotelsPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading hotels...</div>}
    >
      <HotelResultsPage />
    </Suspense>
  );
}
