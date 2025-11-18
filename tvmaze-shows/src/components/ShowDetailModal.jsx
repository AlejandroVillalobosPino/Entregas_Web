function ShowDetailModal({
                             show,
                             loading,
                             onClose,
                             isFavorite,
                             onToggleFavorite,
                         }) {
    if (!show && !loading) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                {loading && <p>Cargando detalle...</p>}

                {!loading && show && (
                    <>
                        <h2>{show.name}</h2>
                        <div className="modal-body">
                            <div className="modal-image">
                                <img
                                    src={
                                        show.image?.original ||
                                        show.image?.medium ||
                                        "https://via.placeholder.com/300x420?text=No+Image"
                                    }
                                    alt={show.name}
                                />
                            </div>
                            <div className="modal-info">
                                <p>
                                    <strong>Lenguaje:</strong> {show.language}
                                </p>
                                <p>
                                    <strong>Géneros:</strong>{" "}
                                    {show.genres?.length ? show.genres.join(", ") : "N/A"}
                                </p>
                                <p>
                                    <strong>Rating:</strong>{" "}
                                    {show.rating?.average ?? "N/A"}
                                </p>
                                <p>
                                    <strong>Estreno:</strong> {show.premiered || "N/A"}
                                </p>
                                <p>
                                    <strong>Estado:</strong> {show.status}
                                </p>
                                <p>
                                    <strong>Canal:</strong>{" "}
                                    {show.network?.name || show.webChannel?.name || "N/A"}
                                </p>
                                <div className="modal-summary">
                                    <strong>Resumen:</strong>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                show.summary || "Sin resumen disponible.",
                                        }}
                                    />
                                </div>

                                <button
                                    className={`hero-button hero-button-secondary ${
                                        isFavorite ? "hero-button-fav-active" : ""
                                    }`}
                                    onClick={() => onToggleFavorite(show)}
                                >
                                    {isFavorite
                                        ? "★ Quitar de favoritos"
                                        : "☆ Añadir a favoritos"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ShowDetailModal;
