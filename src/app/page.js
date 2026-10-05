import { getTrending } from "@/lib/tmdb";
import MovieCard from "./components/MovieCard";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
    const data = await getTrending();

    const hero = data.results[0];

    return (
        <main className="home">

            <section className="hero">

                {hero.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
                        alt={hero.title || hero.name}
                        fill
                        priority
                        className="hero-image"
                    />
                )}

                <div className="hero-overlay">

                    <div className="hero-content">

                        <p className="hero-label">
                            TRENDING NOW
                        </p>

                        <h1>
                            {hero.title || hero.name}
                        </h1>

                        <p>
                            ⭐ {hero.vote_average.toFixed(1)}
                        </p>

                        <p className="hero-description">
                            {hero.overview}
                        </p>

                        <button>
                            View Details
                        </button>

                    </div>

                </div>

            </section>


            <section className="section">

                <h2>Trending</h2>

                <div className="movie-row">

                    {data.results.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}

                </div>

            </section>

        </main>
    );
}