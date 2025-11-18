import ShowCard from "./ShowCard.jsx";

function FavoritesSection({ favorites, onSelectShow, onToggleFavorite, isFavorite }) {
    if (!favorites.length) {
        return <p>Aún no has añadido ninguna serie a tu lista.</p>;
    }

    return (
        <div className="shows-row">
            <div className="shows-row-scroll">
                {favorites.map((show) => (
                    <ShowCard
                        key={show.id}
                        show={show}
                        onSelectShow={onSelectShow}
                        onToggleFavorite={onToggleFavorite}
                        isFavorite={isFavorite(show.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritesSection;
