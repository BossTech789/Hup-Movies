const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrending() {
    const response = await fetch(
        `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
    }

    return response.json();
}

export async function getMovie(id) {
    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`
    );

    const data = await response.json();

    console.log("MOVIE ID:", id);
    console.log("TMDB RESPONSE:", data);

    if (!response.ok) {
        return null;
    }

    return data;
}

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`
    );

    if (!response.ok) {
        throw new Error("Failed to search TMDB");
    }

    return response.json();
}