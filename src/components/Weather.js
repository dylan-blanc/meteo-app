function Weather({ weatherData, loading, error, onAddToFavorites }) {
    const getWindDirection = (deg) => {
        if (deg >= 330 || deg < 30) return "Nord";
        if (deg >= 30 && deg < 60) return "Nord-Est";
        if (deg >= 60 && deg < 120) return "Est";
        if (deg >= 120 && deg < 150) return "Sud-Est";
        if (deg >= 150 && deg < 210) return "Sud";
        if (deg >= 210 && deg < 240) return "Sud-Ouest";
        if (deg >= 240 && deg < 300) return "Ouest";
        if (deg >= 300 && deg < 330) return "Nord-Ouest";
        return "Inconnu";
    };

    // Affichage du chargement
    if (loading) {
        return (
            <div className="weather-container">
                <p>Chargement des données météo...</p>
            </div>
        );
    }

    // Affichage de l'erreur
    if (error) {
        return (
            <div className="weather-container">
                <p className="error">Erreur : {error}</p>
            </div>
        );
    }

    // Affichage initial (aucune recherche effectuée)
    if (!weatherData) {
        return (
            <div className="weather-container">
                <p>Recherchez une ville pour voir la météo</p>
            </div>
        );
    }

    // Affichage des données météo
    return (
        <div className="weather-container">
            <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
            />
            <h2>{weatherData.name}</h2>
            <p>Température : {weatherData.main.temp}°C</p>
            <p>Température ressentie : {weatherData.main.feels_like}°C</p>
            <p>Vitesse du vent : {weatherData.wind.speed} m/s</p>
            <p>Direction du vent : {getWindDirection(weatherData.wind.deg)}</p>
            <p>Description : {weatherData.weather[0].description}</p>
            <p>Humidité : {weatherData.main.humidity}%</p>
            <button
                onClick={() => onAddToFavorites(weatherData.name)}
                className="btn-add-favorite"
            >
                ⭐ Ajouter aux favoris
            </button>
        </div>
    );
}

export default Weather;
