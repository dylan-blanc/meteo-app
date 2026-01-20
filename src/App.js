import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const [city, setCity] = useState('Paris');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) { // code 200 signifie une requete valide (ville valide dans l'API)
          setWeatherData(data);
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

  return (
    <div className="App">
      <h1>Meteo-React</h1>
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />
      <header className="App-header">
        <Weather
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </header>
    </div>
  );
}

export default App;
