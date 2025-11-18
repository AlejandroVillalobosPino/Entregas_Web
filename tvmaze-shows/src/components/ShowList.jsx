import ShowCard from "./ShowCard.jsx";

function ShowList({ shows, onSelectShow, onToggleFavorite, isFavorite }) {
    if (!shows.length) {
        return <p>No se han encontrado series con esos criterios.</p>;
    }

    return (
        <div className="shows-row">
            <div className="shows-row-scroll">
                {shows.map((show) => (
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

export default ShowList;
