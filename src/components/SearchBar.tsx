"use client";
import { useState } from "react";

export default function SearchBar({ onSearch}: { onSearch: (query: string) => void}) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value.trim());
    }

    return(
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for an item"
                className="border p-2 rounded w-full"
                />
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Search
                </button>
        </form>
    );
}