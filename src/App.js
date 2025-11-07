import React, { useState, useEffect } from 'react';
import './App.css';

// Indian states and their major cities
const indianStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"]
};

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const API_KEY = '414304b6c8cb26469c0b5031b0da6e33';

  // Remove the useEffect since we're now using the Check Weather button

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},IN&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setError('City not found. Please try again.');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity('');
    setWeather(null);
    setError('');
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    setWeather(null); // Clear weather data when city changes
  };

  const handleCheckWeather = () => {
    if (selectedCity) {
      fetchWeatherData();
    }
  };

  const handleCancel = () => {
    setSelectedState('');
    setSelectedCity('');
    setWeather(null);
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Indian Weather App</h1>
        
        <div className="selection-container">
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="select-input"
          >
            <option value="">Select State</option>
            {Object.keys(indianStates).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="select-input"
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {selectedState &&
              indianStates[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          <div className="button-container">
            <button 
              className="check-button" 
              onClick={handleCheckWeather}
              disabled={!selectedCity}
            >
              Check Weather
            </button>
            <button 
              className="cancel-button" 
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {selectedState}</h2>
            <div className="weather-details">
              <p className="temperature">{Math.round(weather.main.temp)}°C</p>
              <p className="description">{weather.weather[0].description}</p>
              <div className="additional-info">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
                <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;