function FiltersBar({
                        genres,
                        selectedGenre,
                        onGenreChange,
                        sortByRating,
                        onSortChange,
                    }) {
    return (
        <div className="filters-bar">
            <div className="filter">
                <label>Género:</label>
                <select
                    value={selectedGenre}
                    onChange={(e) => onGenreChange(e.target.value)}
                >
                    <option value="all">Todos</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter">
                <label>Ordenar por rating:</label>
                <select
                    value={sortByRating}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="none">Sin orden</option>
                    <option value="asc">De menor a mayor</option>
                    <option value="desc">De mayor a menor</option>
                </select>
            </div>
        </div>
    );
}

export default FiltersBar;
