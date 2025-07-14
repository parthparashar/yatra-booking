"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import hotels from "@/app/mockData/hotels";
import { Hotel } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const router = useRouter();

  useEffect(() => {
    const found = hotels.find((h) => h.id === id);
    setHotel(found || null);
  }, [id]);

  if (!hotel) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">Hotel not found</h2>
        <Link href="/" className="text-blue-600 mt-4 inline-block">
          ← Back to Search
        </Link>
      </div>
    );
  }

  const handleBooking = () => {
    alert(`Booking initiated for ${hotel.name}!`);
  };

  return (
    <div className="bg-[#f7fafd] min-h-screen px-4 md:px-16 py-10">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 font-medium inline-block mb-6"
      >
        ← Back to Results
      </button>

      <div className="rounded-xl overflow-hidden shadow-md mb-8">
        <Image
          src="/hotel-room.jpeg"
          alt={hotel.name}
          width={1200}
          height={500}
          className="w-full object-cover h-80 md:h-[400px]"
        />
        <div className="absolute top-[28rem] left-25 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">{hotel.name}</h1>
          <p className="text-lg mt-1">📍 {hotel.city}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2 text-[#002B5B]">
              About This Hotel
            </h2>
            <p className="text-gray-600">{hotel.description}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#002B5B]">
              Facilities & Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.facilities.map((facility, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700 font-medium"
                >
                  {facility}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-[#002B5B]">
              Contact Information
            </h2>
            <p className="text-gray-700 text-sm mb-2">
              📞 Phone: +91-9876543210
            </p>
            <p className="text-gray-700 text-sm">
              ✉️ Email: info@
              {hotel.name.toLowerCase().replace(/\s+/g, "")}.com
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/3 ">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-t-xl text-white p-6">
            <p className="text-2xl font-bold">₹{hotel.price}</p>
            <p className="text-sm">per night</p>
          </div>

          <div className="bg-white rounded-b-xl shadow-md p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Rating</p>
              <p className="text-lg text-yellow-500">
                {"★".repeat(Math.round(hotel.rating))}
                {"☆".repeat(5 - Math.round(hotel.rating))}{" "}
                <span className="text-gray-600 text-sm ml-1">
                  ({hotel.rating})
                </span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 font-medium">Location</p>
              <p className="text-md font-semibold">{hotel.city}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 font-medium">Base Price</p>
              <p className="text-md text-black">₹{hotel.price}</p>

              <p className="text-sm text-gray-600 font-medium mt-2">
                Taxes & Fees
              </p>
              <p className="text-md text-black">₹396</p>

              <p className="text-sm text-gray-600 font-medium mt-2">Total</p>
              <p className="text-lg font-bold text-green-700">
                ₹{hotel.price + 396}
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 rounded-md font-semibold hover:opacity-90"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
