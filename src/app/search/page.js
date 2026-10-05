import Image from "next/image";
import Link from "next/link";
import { searchMovies } from "@/lib/tmdb";

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;

    const query = params.query || "";

    if (!query) {
        return (
            <main className="search-page">
                <h1>Search</h1>
                <p>Enter a movie or TV show to search.</p>
            </main>
        );
    }

    const data = await searchMovies(query);

    const results = data.results.filter(
        (item) =>
            item.media_type === "movie" ||
            item.media_type === "tv"
    );

    return (
        <main className="search-page">

            <h1>
                Search results for "{query}"
            </h1>

            <div className="search-grid">

                {results.map((item) => {

                    const title = item.title || item.name;

                    const type = item.media_type;

                    const href =
                        type === "movie"
                            ? `/movie/${item.id}`
                            : `/tv/${item.id}`;

                    return (
                        <Link
                            key={`${type}-${item.id}`}
                            href={href}
                            className="movie-card"
                        >

                            {item.poster_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={title}
                                    width={200}
                                    height={300}
                                />
                            ) : (
                                <div className="no-poster">
                                    No Image
                                </div>
                            )}

                            <h3>
                                {title}
                            </h3>

                            <p>
                                {type === "movie"
                                    ? "🎬 Movie"
                                    : "📺 TV Show"}
                            </p>

                            <p>
                                ⭐{" "}
                                {item.vote_average
                                    ? item.vote_average.toFixed(1)
                                    : "N/A"}
                            </p>

                        </Link>
                    );
                })}

            </div>

        </main>
    );
}