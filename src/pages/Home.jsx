import axios from "axios";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import SearchableSelect from "../Components/SearchableSelect";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const apikey = "ca6c0eaa25c75a08a5c2a8610369df2a";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [city, setCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [citiesError, setCitiesError] = useState("");
  const [countriesError, setCountriesError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

  useEffect(() => {
    let active = true;
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        if (!active) return;
        const list = (response.data?.data || [])
          .map((item) => item.country)
          .filter(Boolean);
        setCountries([...new Set(list)].sort());
      })
      .catch(() => {
        if (active) setCountriesError("Failed to load countries. Please refresh.");
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!city) return;
    let active = true;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=${unit}`
      )
      .then((response) => {
        if (active) setWeatherData(response.data);
      })
      .catch(() => {
        console.error("Error fetching weather data.");
      });
    return () => {
      active = false;
    };
  }, [city, unit]);

  useEffect(() => {
    if (!weatherData || !weatherData.coord) return;
    const { lat, lon } = weatherData.coord;
    const map = L.map("weather-map").setView([lat, lon], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<b>${weatherData.name}</b>`)
      .openPopup();
    return () => map.remove();
  }, [weatherData]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
    setCity("");
    setWeatherData(null);
    setCities([]);
    setCitiesError("");
    if (!country) return;

    setLoadingCities(true);
    axios
      .post("https://countriesnow.space/api/v0.1/countries/cities", { country })
      .then((response) => {
        const list = response.data?.data;
        if (Array.isArray(list) && list.length > 0) {
          setCities([...new Set(list)].sort());
        } else {
          setCitiesError("No cities found for this country.");
        }
      })
      .catch(() => {
        setCitiesError("Failed to load cities. Please try again.");
      })
      .finally(() => {
        setLoadingCities(false);
      });
  };

  const handleCityChange = (selected) => {
    setSelectedCity(selected);
    setWeatherData(null);
    if (selected) setCity(selected);
  };

  const handleUnitChange = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <div className="home">
      <section className="home-hero">
        <h1>Welcome to the Weather App</h1>
        <p className="home-subtitle">
          Get real-time weather updates for cities around the world.
        </p>
      </section>

      <section className="search-section">
        <SearchableSelect
          label="Country"
          placeholder="Select a country"
          options={countries}
          value={selectedCountry}
          onChange={handleCountryChange}
          error={countriesError}
        />

        <SearchableSelect
          label="City"
          placeholder={
            selectedCountry ? "Select a city" : "Select a country first"
          }
          options={cities}
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedCountry}
          loading={loadingCities}
          error={citiesError}
        />
      </section>

      <div className="unit-toggle-wrap">
        <button className="unit-toggle" onClick={handleUnitChange}>
          Toggle Unit ({unit === "metric" ? "Celsius" : "Fahrenheit"})
        </button>
      </div>

      {weatherData && (
        <>
          <section className="weather-overview">
            <div className="weather-card">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p className="weather-temp">
                {Math.round(weatherData.main.temp)}
                {unitSymbol}
              </p>
              <p className="weather-desc">
                {weatherData.weather[0].description}
              </p>
              <p>
                Feels like {Math.round(weatherData.main.feels_like)}
                {unitSymbol}
              </p>
            </div>

            <div className="map-section">
              <h2>Location</h2>
              <div id="weather-map" className="weather-map"></div>
            </div>
          </section>

          <section className="weather-situation">
            <h2>Weather Situation</h2>
            <div className="weather-details">
              <div className="detail-item">
                <span>Humidity</span>
                <strong>{weatherData.main.humidity}%</strong>
              </div>
              <div className="detail-item">
                <span>Wind Speed</span>
                <strong>
                  {weatherData.wind.speed} {speedUnit}
                </strong>
              </div>
              <div className="detail-item">
                <span>Wind Gust</span>
                <strong>
                  {weatherData.wind.gust ? `${weatherData.wind.gust} ${speedUnit}` : "N/A"}
                </strong>
              </div>
              <div className="detail-item">
                <span>Pressure</span>
                <strong>{weatherData.main.pressure} hPa</strong>
              </div>
              <div className="detail-item">
                <span>Visibility</span>
                <strong>{(weatherData.visibility / 1000).toFixed(1)} km</strong>
              </div>
              <div className="detail-item">
                <span>Cloudiness</span>
                <strong>{weatherData.clouds.all}%</strong>
              </div>
              <div className="detail-item">
                <span>Sunrise</span>
                <strong>
                  {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                </strong>
              </div>
              <div className="detail-item">
                <span>Sunset</span>
                <strong>
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </strong>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
