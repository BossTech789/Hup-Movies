import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
    const title = movie.title || movie.name;

    // TMDB tells us whether this is a movie or TV show
    const type = movie.media_type || "movie";

    const href =
        type === "tv"
            ? `/tv/${movie.id}`
            : `/movie/${movie.id}`;

    return (
        <Link href={href} className="movie-card">
            {movie.poster_path ? (
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={title}
                    width={200}
                    height={300}
                />
            ) : (
                <div className="no-poster">
                    No Image
                </div>
            )}

            <h3>{title}</h3>

            <p>
                ⭐{" "}
                {movie.vote_average
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
            </p>
        </Link>
    );
}