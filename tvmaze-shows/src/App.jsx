import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FiltersBar from "./components/FiltersBar.jsx";
import ShowList from "./components/ShowList.jsx";
import FavoritesSection from "./components/FavoritesSection.jsx";
import ShowDetailModal from "./components/ShowDetailModal.jsx";
import Hero from "./components/Hero.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

const API_BASE = "https://api.tvmaze.com";

function App() {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedShow, setSelectedShow] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const [favorites, setFavorites] = useLocalStorage("tvmaze-favorites", []);

    const [selectedGenre, setSelectedGenre] = useState("all");
    const [sortByRating, setSortByRating] = useState("none"); // "none" | "asc" | "desc"

    useEffect(() => {
        async function fetchShows() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`${API_BASE}/shows`);
                if (!res.ok) throw new Error("Error al cargar las series");
                const data = await res.json();
                setShows(data);
            } catch (err) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        }

        fetchShows();
    }, []);

    // Filtrado + ordenación
    const filteredShows = useMemo(() => {
        let result = [...shows];

        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            result = result.filter((show) =>
                show.name.toLowerCase().includes(term)
            );
        }

        if (selectedGenre !== "all") {
            result = result.filter((show) =>
                show.genres?.includes(selectedGenre)
            );
        }

        if (sortByRating !== "none") {
            result.sort((a, b) => {
                const ra = a.rating?.average ?? 0;
                const rb = b.rating?.average ?? 0;
                return sortByRating === "asc" ? ra - rb : rb - ra;
            });
        }

        return result;
    }, [shows, searchTerm, selectedGenre, sortByRating]);

    // Lista de géneros para el filtro
    const genres = useMemo(() => {
        const setGenres = new Set();
        shows.forEach((show) => {
            (show.genres || []).forEach((g) => setGenres.add(g));
        });
        return Array.from(setGenres).sort();
    }, [shows]);

    // Serie destacada estilo HBO (la de mayor rating del listado filtrado)
    const featuredShow = useMemo(() => {
        if (!filteredShows.length) return null;
        return [...filteredShows].sort((a, b) => {
            const ra = a.rating?.average ?? 0;
            const rb = b.rating?.average ?? 0;
            return rb - ra;
        })[0];
    }, [filteredShows]);

    // Favoritos
    const isFavorite = (showId) =>
        favorites.some((fav) => fav.id === showId);

    const handleToggleFavorite = (show) => {
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.id === show.id);
            if (exists) {
                return prev.filter((fav) => fav.id !== show.id);
            }
            return [...prev, show];
        });
    };

    // Detalle (modal)
    const handleOpenDetail = async (showId) => {
        try {
            setDetailLoading(true);
            const res = await fetch(`${API_BASE}/shows/${showId}`);
            if (!res.ok) throw new Error("Error al cargar el detalle");
            const data = await res.json();
            setSelectedShow(data);
        } catch (err) {
            console.error(err);
            alert("No se pudo cargar el detalle de la serie");
        } finally {
            setDetailLoading(false);
        }
    };

    const handleCloseDetail = () => {
        setSelectedShow(null);
    };

    return (
        <div className="app">
            {/* NAVBAR tipo streaming */}
            <header className="app-header">
                <div className="nav-left">
                    <div className="logo">BONIATSMAX</div>
                    <nav className="nav-menu">
                        <button className="nav-link nav-link-active">Series</button>
                        <button className="nav-link">Películas</button>
                        <button className="nav-link">Mi lista</button>
                    </nav>
                </div>
                <div className="nav-right">
                    <div className="nav-search">
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>
                    <div className="nav-avatar">JA</div>
                </div>
            </header>

            {/* HERO + CONTENIDO */}
            <main className="app-main">
                <Hero
                    show={featuredShow}
                    onSelectShow={handleOpenDetail}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={featuredShow ? isFavorite(featuredShow.id) : false}
                />

                <section className="filters-wrapper">
                    <FiltersBar
                        genres={genres}
                        selectedGenre={selectedGenre}
                        onGenreChange={setSelectedGenre}
                        sortByRating={sortByRating}
                        onSortChange={setSortByRating}
                    />
                </section>

                <section className="section">
                    <h2 className="section-title">Explora series</h2>
                    {loading && <p>Cargando series...</p>}
                    {error && <p className="error">{error}</p>}
                    {!loading && !error && (
                        <ShowList
                            shows={filteredShows}
                            onSelectShow={handleOpenDetail}
                            onToggleFavorite={handleToggleFavorite}
                            isFavorite={isFavorite}
                        />
                    )}
                </section>

                <section className="section">
                    <h2 className="section-title">Mi lista</h2>
                    <FavoritesSection
                        favorites={favorites}
                        onSelectShow={handleOpenDetail}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorite={isFavorite}
                    />
                </section>
            </main>

            <ShowDetailModal
                show={selectedShow}
                loading={detailLoading}
                onClose={handleCloseDetail}
                isFavorite={selectedShow ? isFavorite(selectedShow.id) : false}
                onToggleFavorite={handleToggleFavorite}
            />
        </div>
    );
}

export default App;
