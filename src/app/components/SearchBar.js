"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch(event) {
        event.preventDefault();

        if (!query.trim()) {
            return;
        }

        router.push(
            `/search?query=${encodeURIComponent(query.trim())}`
        );
    }

    return (
        <form
            onSubmit={handleSearch}
            className="search-form"
        >
            <input
                type="text"
                placeholder="Search movies, TV shows, actors..."
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
}