import "./globals.css";

import Providers from "./providers";
import ThemeWrapper from "./components/ThemeWrapper";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";

export const metadata = {
  title: "Hup Movies",
  description: "Discover movies and TV shows",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <ThemeWrapper>
                        <header className="navbar">

                            <a href="/">
                                <h1>Hup Movies</h1>
                            </a>

                             <SearchBar />
                            <ThemeToggle />
                        </header>

                        {children}
                    </ThemeWrapper>
                </Providers>
            </body>
        </html>
    );
}