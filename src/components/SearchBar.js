function SearchBar({ city, setCity, onSearch }) {
    // Gère la touche Entrée pour lancer la recherche
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher une ville"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={onSearch}>Rechercher</button>
        </div>
    );
}

export default SearchBar;