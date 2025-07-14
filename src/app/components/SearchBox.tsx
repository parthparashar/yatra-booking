"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cities from "../mockData/cities";

const SearchBox = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const router = useRouter();
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const getNextDay = (date: string) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const handleSearch = () => {
    setError("");
    if (!city.trim()) return setError("Please enter a city.");
    if (checkIn < today) return setError("Check-in cannot be in the past.");
    if (checkOut && checkOut <= checkIn)
      return setError("Check-out must be after check-in.");

    const query = new URLSearchParams({ city, checkIn, checkOut, guests });
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <section className="bg-white shadow-md rounded-xl p-8 max-w-6xl mx-auto mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#002B5B] text-center mb-8">
        Search Hotels
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-[#002B5B]">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            list="city-options"
            placeholder="Enter city"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <datalist id="city-options">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={checkOut}
            min={checkIn ? getNextDay(checkIn) : today}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((g) => (
              <option key={g} value={g}>
                {g} Guest{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="text-center text-red-600 font-medium mb-4">{error}</div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-md px-6 py-2 m-8 hover:bg-[#001B3F] transition"
        >
          🔍 Search Hotels
        </button>
      </div>
    </section>
  );
};

export default SearchBox;
