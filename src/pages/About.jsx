import React from "react";

const features = [
  { icon: "🌍", title: "Country & City Search", text: "Pick a country, then choose any available city from a searchable list." },
  { icon: "📍", title: "Location Details", text: "See the exact city and country for the weather you are viewing." },
  { icon: "🌡️", title: "Live Temperature", text: "Current temperature at a glance, with instant updates." },
  { icon: "🔄", title: "°C / °F Toggle", text: "Switch the temperature unit between Celsius and Fahrenheit anytime." },
  { icon: "🤗", title: "Feels Like", text: "See how the weather actually feels, not just what the thermometer says." },
  { icon: "💧", title: "Humidity", text: "Current humidity level to help you plan your day." },
  { icon: "🌬️", title: "Wind Speed", text: "Wind speed and direction, plus wind gust measurements." },
  { icon: "📊", title: "Pressure & Visibility", text: "Atmospheric pressure and visibility distance data." },
  { icon: "☁️", title: "Cloud Coverage", text: "Cloudiness percentage so you know what to expect overhead." },
  { icon: "🌅", title: "Sunrise & Sunset", text: "Local sunrise and sunset times for the selected city." },
];

const techs = [
  {
    icon: "🌦️",
    name: "OpenWeatherMap API",
    description: "Powers real-time data: temperature, humidity, wind speed, pressure, visibility, cloudiness, sunrise, and sunset.",
  },
  {
    icon: "🌍",
    name: "CountriesNow API",
    description: "Fetches the full list of countries and their cities, so you can pick any location before viewing the weather.",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <header className="about-hero">
        <span className="about-badge">🌤️ Weather App</span>
        <h1>About Weather App</h1>
        <p className="about-lead">
          A simple, responsive web application that delivers real-time weather
          for cities around the world. Select a country, choose a city, and
          instantly see current conditions in a clean, easy-to-read interface.
        </p>
        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">250+</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Weather Metrics</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Live Updates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Responsive</span>
          </div>
        </div>
      </header>

      <section className="about-section">
        <h2>✨ Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>🛠️ Technologies &amp; APIs</h2>
        <p className="about-sub">
          Built with <strong>React.js</strong> and powered by two external APIs
          to provide accurate, dynamic weather data.
        </p>
        <div className="tech-grid">
          {techs.map((tech, index) => (
            <div className="tech-card" key={index}>
              <span className="tech-icon">{tech.icon}</span>
              <h3>{tech.name}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>🎯 Our Mission</h2>
        <p>
          To provide a fast, accurate, and user-friendly weather application
          that helps people stay informed about current conditions anywhere in
          the world. By combining reliable APIs with a clean, responsive
          interface, we deliver essential weather information in just a few
          clicks.
        </p>
      </section>

      <section className="about-cta">
        <h2>📬 Get in Touch</h2>
        <p>
          We welcome your feedback and suggestions. Questions, issues, or just
          want to say hi? Visit the Contact page and send us a message.
        </p>
        <a className="about-cta-btn" href="/contact">
          Contact Us →
        </a>
      </section>
    </div>
  );
};

export default About;
