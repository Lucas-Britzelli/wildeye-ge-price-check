"use client";
import { useState } from "react";
import { Scale } from "lucide-react";
import SearchBar from "@/components/SearchBar";

type ItemDetail = {
  id: number;
  name: string;
  icon_large: string;
  current: { price: string };
  today: { price: string; trend: string };
  trend: string;
};

export default function Home() {
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [error, setError] = useState("");
  const [recent, setRecent] = useState<ItemDetail[]>([]);

  const searchItem = async (query: string) => {
    setError("");
    setItem(null);

    try {
      const res = await fetch(`/api/item?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        setError("Item not found or error occurred.");
        return;
      }

      const data = await res.json();
      if (data.item) {
        setItem(data.item);
      
        setRecent((prev) => {
          const updated = [data.item, ...prev.filter(i => i.id !== data.item.id)];
          return updated.slice(0, 5); // Keep only the 5 most recent
        });
      }
    } catch (err) {
      console.error("Error fetching item data:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.15)] border border-yellow-400 p-6">

        <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-yellow-400 mb-6">
        <Scale className="w-8 h-8 text-yellow-400" /> WildEye's Price Checker <Scale className="w-8 h-8 text-yellow-400" />
        </h1>
        <SearchBar onSearch={searchItem} />
  
        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
  
        {item && (
          <div className="mt-6 p-4 border border-gray-700 rounded shadow text-center bg-gray-700">
            <img
              src={item.icon_large}
              alt={item.name}
              className="mx-auto w-16 h-16"
            />
            <h2 className="text-xl font-semibold mt-2 text-yellow-300">
              {item.name}
            </h2>
            <p className="text-lg mt-1 text-green-400">
              Current Price: <span className="font-mono">{item.current.price}</span>
            </p>
            <p className="text-sm text-gray-300 mt-1">
              Today: {item.today.price} ({item.today.trend})
            </p>
          </div>
        )}
        {recent.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Recent Searches</h3>
          <ul className="space-y-3">
            {recent.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow hover:bg-gray-900 transition"
              >
                <div className="flex items-center gap-3">
                  <img src={item.icon_large} alt={item.name} className="w-10 h-10" />
                  <span className="text-white font-medium">{item.name}</span>
                </div>
                <span className="text-yellow-300 font-mono">{item.current.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      </div>
    </main>
  );
  
}
