import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovie } from "@/lib/tmdb";

export default async function MovieDetails({ params }) {
    const { id } = await params;

    const movie = await getMovie(id);

    if (!movie) {
        notFound();
    }

    const trailer = movie.videos?.results?.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    return (
        <main className="movie-details">

            {/* =========================
                MOVIE HERO
            ========================= */}

            <section className="movie-hero">

                {movie.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        priority
                        className="movie-backdrop"
                    />
                )}

                <div className="movie-overlay">

                    <div className="movie-info">

                        {movie.poster_path && (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="movie-poster"
                            />
                        )}

                        <div>

                            <h1>{movie.title}</h1>

                            <p>
                                ⭐{" "}
                                {movie.vote_average
                                    ? movie.vote_average.toFixed(1)
                                    : "N/A"}
                            </p>

                            <p>
                                {movie.release_date}
                            </p>

                            <p>
                                {movie.runtime} minutes
                            </p>

                            <p className="movie-overview">
                                {movie.overview}
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                CAST
            ========================= */}

            <section className="movie-section">

                <h2>Cast</h2>

                <div className="cast-row">

                    {movie.credits?.cast
                        ?.slice(0, 10)
                        .map((actor) => (

                            <Link
                                href={`/person/${actor.id}`}
                                className="cast-card"
                                key={actor.id}
                            >

                                {actor.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                        alt={actor.name}
                                        width={120}
                                        height={180}
                                    />
                                ) : (
                                    <div className="no-poster">
                                        No Image
                                    </div>
                                )}

                                <h3>
                                    {actor.name}
                                </h3>

                                <p>
                                    {actor.character}
                                </p>

                            </Link>

                        ))}

                </div>

            </section>


            {/* =========================
                TRAILER
            ========================= */}

            {trailer && (
                <section className="movie-section">

                    <h2>Trailer</h2>

                    <div className="trailer">

                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movie.title} trailer`}
                            allowFullScreen
                        />

                    </div>

                </section>
            )}

        </main>
    );
}