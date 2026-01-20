import { useState, useEffect } from 'react';

function Favorites({ favorites, onSelectCity, onRemoveFavorite }) {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    // State pour stocker la météo de chaque ville favorite
    const [favoritesWeather, setFavoritesWeather] = useState({});

    // Récupérer la météo pour chaque ville favorite
    useEffect(() => {
        favorites.forEach((city) => {
            // Ne pas re-fetch si déjà en cache
            if (!favoritesWeather[city]) {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.cod === 200) {
                            setFavoritesWeather(prev => ({
                                ...prev,
                                [city]: data
                            }));
                        }
                    })
                    .catch(err => console.error('Erreur météo favorite:', err));
            }
        });
    }, [favorites, API_KEY]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="favorites-container">
            <h3>⭐ Favoris</h3>
            {favorites.length === 0 ? (
                <p className="no-favorites">Aucune ville favorite</p>
            ) : (
                <ul className="favorites-list">
                    {favorites.map((city, index) => {
                        const weather = favoritesWeather[city];
                        return (
                            <li key={index} className="favorite-item">
                                <div className="favorite-info" onClick={() => onSelectCity(city)}>
                                    {weather ? (
                                        <>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                                alt={weather.weather[0].description}
                                                className="favorite-icon"
                                            />
                                            <div className="favorite-details">
                                                <span className="favorite-city-name">{city}</span>
                                                <span className="favorite-temp">{Math.round(weather.main.temp)}°C</span>
                                                <span className="favorite-desc">{weather.weather[0].description}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="favorite-city-name">{city}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => onRemoveFavorite(city)}
                                    className="btn-remove"
                                    title="Supprimer des favoris"
                                >
                                    ❌
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default Favorites;

