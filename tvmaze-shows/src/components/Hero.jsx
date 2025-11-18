function Hero({ show, onSelectShow, onToggleFavorite, isFavorite }) {
    if (!show) return null;

    const backdrop =
        show.image?.original ||
        show.image?.medium ||
        "https://via.placeholder.com/600x900?text=TV+Show";

    const rating = show.rating?.average ?? "N/A";
    const genres = show.genres?.join(" · ") || "Sin género";

    return (
        <section className="hero">
            {/* Fondo difuminado */}
            <div
                className="hero-bg"
                style={{
                    backgroundImage: `url(${backdrop})`,
                }}
            />

            {/* Contenido por encima */}
            <div className="hero-inner">
                <div className="hero-left">
                    <p className="hero-badge">DESTACADO</p>
                    <h2 className="hero-title">{show.name}</h2>
                    <p className="hero-meta">
                        ⭐ {rating} · {genres}
                    </p>
                    <div
                        className="hero-summary"
                        dangerouslySetInnerHTML={{
                            __html: show.summary || "Sin sinopsis disponible.",
                        }}
                    />
                    <div className="hero-actions">
                        <button
                            className="hero-button hero-button-primary"
                            onClick={() => onSelectShow(show.id)}
                        >
                            Ver detalles
                        </button>
                        <button
                            className={`hero-button hero-button-secondary ${
                                isFavorite ? "hero-button-fav-active" : ""
                            }`}
                            onClick={() => onToggleFavorite(show)}
                        >
                            {isFavorite ? "★ En favoritos" : "☆ Añadir a favoritos"}
                        </button>
                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src={backdrop}
                        alt={show.name}
                        className="hero-poster"
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;
