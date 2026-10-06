import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTV } from "@/lib/tmdb";

export default async function TVDetails({ params }) {
    const { id } = await params;

    const show = await getTV(id);

    if (!show) {
        notFound();
    }

    const trailer = show.videos?.results?.find(
        (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

    return (
        <main className="movie-page">

            {/* HERO */}

            <section className="movie-hero">

                {show.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                        alt={show.name}
                        fill
                        priority
                        className="movie-backdrop"
                    />
                )}

                <div className="movie-overlay"></div>

                <div className="movie-hero-content">

                    {show.poster_path && (
                        <div className="movie-poster">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                width={280}
                                height={420}
                            />
                        </div>
                    )}

                    <div className="movie-info">

                        <h1>{show.name}</h1>

                        <div className="movie-meta">

                            <span>
                                ⭐ {show.vote_average?.toFixed(1)}
                            </span>

                            <span>
                                {show.first_air_date}
                            </span>

                            <span>
                                {show.number_of_seasons} Seasons
                            </span>

                            <span>
                                {show.number_of_episodes} Episodes
                            </span>

                        </div>

                        <p className="movie-overview">
                            {show.overview}
                        </p>

                    </div>

                </div>

            </section>


            {/* CAST */}

            <section className="movie-cast">

                <h2>Cast</h2>

                <div className="cast-row">

                    {show.credits?.cast
                        ?.slice(0, 15)
                        .map((actor) => (

                            <Link
                                key={actor.id}
                                href={`/person/${actor.id}`}
                                className="cast-card"
                            >

                                {actor.profile_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                                        alt={actor.name}
                                        width={150}
                                        height={210}
                                    />
                                ) : (
                                    <div className="no-poster">
                                        No Image
                                    </div>
                                )}

                                <h3>{actor.name}</h3>

                                <p>
                                    {actor.character}
                                </p>

                            </Link>

                        ))}

                </div>

            </section>


            {/* TRAILER */}

            {trailer && (
                <section className="movie-trailer">

                    <h2>Trailer</h2>

                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={`${show.name} Trailer`}
                        allowFullScreen
                    />

                </section>
            )}

        </main>
    );
}