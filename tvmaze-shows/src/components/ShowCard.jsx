function ShowCard({ show, onSelectShow, onToggleFavorite, isFavorite }) {
    const imageUrl =
        show.image?.medium || show.image?.original || "https://via.placeholder.com/210x295?text=No+Image";

    const rating = show.rating?.average ?? "N/A";

    return (
        <article className="show-card" onClick={() => onSelectShow(show.id)}>
            <div className="show-card-image-wrapper">
                <img src={imageUrl} alt={show.name} className="show-card-image" />
                <button
                    className={`show-card-fav ${isFavorite ? "show-card-fav--active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(show);
                    }}
                >
                    {isFavorite ? "★" : "☆"}
                </button>
            </div>
            <div className="show-card-body">
                <h3 className="show-card-title">{show.name}</h3>
                <p className="show-card-rating">⭐ {rating}</p>
            </div>
        </article>
    );
}

export default ShowCard;
