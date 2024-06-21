import React, { useState } from 'react';
import './tailwind.css'; // Import Tailwind CSS

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7e258cd49a7494a1b539035d9c5563b5&units=metric`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ backgroundImage: `url(${require('./back.jpg')})` }}>
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Weather Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
            value={location}
            onChange={handleLocationChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Get Weather
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {weatherData && (
          <div className="mt-0 w-full "style={{ position:"absolute",left:"100px",top:"100px"}}>
            <h2 className="text-5xl font-semibold">{weatherData.name}</h2>
            <p className="text-lg text-white text-4xl">Temperature: {weatherData.main.temp}°C</p>
            <p className="text-lg text-white text-4xl">Description: {weatherData.weather[0].description}</p>
            <p className="text-lg text-white text-4xl">Wind Speed: {weatherData.wind.speed} m/s</p>
            <p className="text-lg text-white text-4xl">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg text-white text-4xl">Visibility: {weatherData.visibility} meters</p>
            <p className="text-lg text-white text-4xl">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p className="text-lg text-white text-4xl">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p className="text-lg text-white text-4xl">Pressure: {weatherData.main.pressure} hPa</p>
            <p className="text-lg text-white text-4xl">Feels Like: {weatherData.main.feels_like}°C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
