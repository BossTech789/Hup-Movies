import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPerson, getPersonCredits } from "@/lib/tmdb";

export default async function PersonPage({ params }) {
    const { id } = await params;

    const person = await getPerson(id);
    const credits = await getPersonCredits(id);

    if (!person) {
        notFound();
    }

    const knownFor = credits?.cast || [];

    return (
        <main className="person-page">

            {/* =========================
                PERSON HERO
            ========================= */}

            <section className="person-hero">

                <div className="person-container">

                    {/* PROFILE IMAGE */}

                    <div className="person-image">

                        {person.profile_path ? (
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                alt={person.name}
                                width={300}
                                height={450}
                                priority
                            />
                        ) : (
                            <div className="person-no-image">
                                No Image
                            </div>
                        )}

                    </div>

                    {/* PERSON INFO */}

                    <div className="person-info">

                        <p className="person-label">
                            ACTOR
                        </p>

                        <h1>{person.name}</h1>

                        {person.birthday && (
                            <p className="person-meta">
                                Born: {person.birthday}
                            </p>
                        )}

                        {person.place_of_birth && (
                            <p className="person-meta">
                                From: {person.place_of_birth}
                            </p>
                        )}

                        {person.biography && (
                            <p className="person-biography">
                                {person.biography}
                            </p>
                        )}

                    </div>

                </div>

            </section>


            {/* =========================
                KNOWN FOR
            ========================= */}

            <section className="person-credits">

                <h2>
                    Movies & TV Shows
                </h2>

                <div className="person-credit-grid">

                   
                   {knownFor.map((credit, index) => {
    const title = credit.title || credit.name;

    const type =
        credit.media_type ||
        (credit.first_air_date ? "tv" : "movie");

    const href =
        type === "tv"
            ? `/tv/${credit.id}`
            : `/movie/${credit.id}`;

    return (
        <Link
            key={`${type}-${credit.id}-${index}`}
            href={href}
            className="person-credit-card"
        >
            {credit.poster_path ? (
                <Image
                    src={`https://image.tmdb.org/t/p/w500${credit.poster_path}`}
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
                {credit.vote_average
                    ? credit.vote_average.toFixed(1)
                    : "N/A"}
            </p>
        </Link>
    );
})}

                </div>

            </section>

        </main>
    );
}