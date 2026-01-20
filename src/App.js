import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [city, setCity] = useState('Paris');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State pour les favoris
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('weatherFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  /*
  * lance le script de recherche avec la valeur
  * [city, setcity] par defaut soit : 'Paris'
  */
  useEffect(() => {
    handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  /*
  * // eslint-disable-line react-hooks/exhaustive-deps
  * est un commentaire pour desactiver le warning de eslint dans le terminal
  * 
  * []); lance une seule fois le script 
  */

  const handleSearch = (searchCity = city) => {
    setLoading(true);
    setError(null);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=fr`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) { // code 200 signifie une requete valide (ville valide dans l'API)
          setWeatherData(data);
          setCity(searchCity);
        } else { // les autres codes, 404 non trouvee, 401 Clé API invalide, 429 trop de requête
          setError(data.message || 'Ville non trouvée'); // pas de gestion d'erreur complexe
          setWeatherData(null);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur de connexion');
        setLoading(false);
      });
  };

  // Ajouter une ville aux favoris
  const addToFavorites = (cityName) => {
    if (!favorites.includes(cityName)) {
      const newFavorites = [...favorites, cityName];
      setFavorites(newFavorites);
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
    }
  };

  // Supprimer une ville des favoris
  const removeFromFavorites = (cityName) => {
    const newFavorites = favorites.filter(c => c !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
  };

  // Charger la météo d'une ville favorite
  const handleSelectFavorite = (cityName) => {
    setCity(cityName);
    handleSearch(cityName);
  };

  return (
    <div className="App">
      {/* Sidebar gauche avec favoris (météo incluse) */}
      <aside className="sidebar">
        <Favorites
          favorites={favorites}
          onSelectCity={handleSelectFavorite}
          onRemoveFavorite={removeFromFavorites}
        />
      </aside>

      {/* Contenu principal */}
      <div className="main-content">
        <h1>Meteo-React</h1>
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => handleSearch(city)}
        />
        <header className="App-header">
          <Weather
            weatherData={weatherData}
            loading={loading}
            error={error}
            onAddToFavorites={addToFavorites}
          />
        </header>
      </div>
    </div>
  );
}

export default App;

