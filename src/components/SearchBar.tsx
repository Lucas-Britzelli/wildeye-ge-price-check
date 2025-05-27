"use client";
import { useState, useEffect } from "react";
import { Item } from "@/types/item";

type SearchBarProps = {
    onSearch: (query: string) => void;
    getSuggestions: (query: string) => string[];
}

export default function SearchBar({ onSearch, getSuggestions }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (query.length > 1) {
            const results = getSuggestions(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    }, [query, getSuggestions]);

    /* Handle the form submission aswell as clear the search field and visible suggestions */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
        setSuggestions([]);
        setQuery("");
    }

    /* Handle suggestion click, set the query to the clicked suggestion and call the onSearch function
    and then clear the visible suggestions aswell as the clear the search field */
    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        onSearch(suggestion);
        setSuggestions([]);
        setQuery("");
    }

    return (
        <div className="relative w-full">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for an item..."
                    className="w-full p-3 bg-gray-700 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                />
                <button type="submit" className="px-4 py-2 bg-yellow-500 text-black rounded-r-lg hover:bg-yellow-600 transition">
                    Search
                </button>
            </form>

            {suggestions.length > 0 && (
            <ul className="bg-gray-800 rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto">
                {suggestions.map((name, index) => (
                <li
                    key={index}
                    onClick={() => handleSuggestionClick(name)}
                    className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                    <span className="text-white">{name}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
    );
}