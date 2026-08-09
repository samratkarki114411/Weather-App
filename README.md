# 🌦️ Weather App

A responsive multi-page weather application built with **React** that allows users to search for countries and cities and view real-time weather information. The application uses third-party REST APIs to retrieve location and weather data and includes an interactive map to display the selected city's location.

## 📌 Project Overview

The Weather App provides users with an easy way to check current weather conditions for cities around the world. Users first select a country and then choose a city from a searchable list. After selecting a city, the application retrieves live weather information from the OpenWeatherMap API and displays temperature, humidity, wind speed, pressure, visibility, cloudiness, sunrise, sunset, and other weather details.

The application also includes an interactive map using **Leaflet and OpenStreetMap**, allowing users to visually identify the selected city's location. A Celsius/Fahrenheit toggle is provided, and the selected temperature preference is stored in the browser's Local Storage.

## ✨ Features

* 🌍 Country selection
* 🏙️ Dynamic city selection based on selected country
* 🔎 Searchable country and city dropdowns
* 🌡️ Real-time temperature information
* ☁️ Current weather conditions
* 💧 Humidity information
* 🌬️ Wind speed and wind gust
* 📊 Atmospheric pressure
* 👁️ Visibility information
* ☁️ Cloudiness percentage
* 🌅 Sunrise time
* 🌇 Sunset time
* 🗺️ Interactive weather map
* 📍 Location marker for selected city
* 🌡️ Celsius/Fahrenheit temperature toggle
* 💾 Local Storage for saving temperature preferences
* ⏳ Loading states while retrieving data
* ⚠️ API error handling
* 📱 Responsive user interface
* 🧭 Multi-page navigation using React Router

## 🛠️ Technologies Used

* **React.js** – Frontend user interface
* **React Router** – Client-side page navigation
* **Axios** – Asynchronous API requests
* **OpenWeatherMap API** – Real-time weather information
* **CountriesNow API** – Country and city information
* **Leaflet** – Interactive maps
* **OpenStreetMap** – Map tiles
* **JavaScript (ES6+)** – Application logic
* **HTML5** – Page structure
* **CSS3** – Styling and responsive design
* **Local Storage** – User preference persistence
* **Git & GitHub** – Version control and source-code management

## 📁 Project Structure

```text
weather-app/
│
├── public/
│
├── src/
│   ├── Components/
│   │   ├── SearchableSelect.jsx
│   │   ├── Navbar.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd weather-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure the API Key

The application uses the **OpenWeatherMap API** to retrieve live weather data.

Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Then use the environment variable in your React code:

```jsx
const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

> **Important:** Do not upload your real API key to a public GitHub repository. Add `.env` to your `.gitignore` file.

Example:

```text
.env
node_modules/
dist/
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will run locally using the development server provided by Vite.

## 🔑 API Configuration

### OpenWeatherMap API

The OpenWeatherMap API is used to retrieve current weather information for the selected city.

The application uses weather data such as:

* Temperature
* Feels-like temperature
* Weather condition
* Humidity
* Wind speed
* Wind gust
* Atmospheric pressure
* Visibility
* Cloudiness
* Sunrise
* Sunset
* Geographic coordinates

### CountriesNow API

The CountriesNow API is used to retrieve country and city information.

The application uses it to:

1. Load the available countries.
2. Retrieve cities after the user selects a country.

This creates a dynamic **Country → City → Weather** workflow.

## 🗺️ Map Integration

The application uses **Leaflet** to display an interactive map.

When weather information is received, the application's latitude and longitude coordinates are extracted from the API response. These coordinates are then used to position the Leaflet map and display a marker for the selected city.

```text
Selected City
      ↓
OpenWeatherMap API
      ↓
Latitude & Longitude
      ↓
Leaflet Map
      ↓
Location Marker
```

## 💾 Local Storage

The application uses browser Local Storage to save the user's preferred temperature unit.

For example:

```jsx
localStorage.setItem("unit", newUnit);
```

When the application starts, the saved preference is retrieved:

```jsx
localStorage.getItem("unit") || "metric";
```

This allows the selected Celsius or Fahrenheit preference to remain available after the page is refreshed.

## 🔄 Application Workflow

```text
Open Weather App
        ↓
Load Countries
        ↓
Select Country
        ↓
Load Cities
        ↓
Select City
        ↓
Fetch Live Weather Data
        ↓
Display Weather Information
        ↓
Display City Location on Map
        ↓
User Can Change Temperature Unit
        ↓
Save Preference in Local Storage
```

## 📄 Application Pages

### Home Page

The Home page is the main weather dashboard. It provides country and city selection, live weather information, detailed weather statistics, temperature unit switching, and an interactive map.

### About Page

The About page provides information about the application, technologies used, APIs, and the purpose of the project.

### Contact Page

The Contact page provides a form where users can enter their name, email address, and message.

## ⚠️ Error Handling

The application includes error handling for API requests. If countries or cities cannot be loaded, an appropriate error message is displayed to the user. Loading indicators are also provided while city information is being retrieved.

For example:

```text
Failed to load countries. Please refresh.
```

or:

```text
Failed to load cities. Please try again.
```

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* 💻 Desktop computers
* 💻 Laptops
* 📱 Tablets
* 📱 Mobile devices

The layout adapts to different screen widths to provide a consistent and user-friendly experience.

## 🔒 Security Note

The OpenWeatherMap API key should not be exposed directly in a public GitHub repository.

For development, use a `.env` file:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Make sure `.env` is included in `.gitignore`:

```text
.env
```

If an API key has already been committed to a public repository, it should be revoked or regenerated through the API provider.

## 📦 Main Dependencies

Install the required packages using:

```bash
npm install axios leaflet react-leaflet react-router-dom
```

If the project uses Vite, the development environment can be started with:

```bash
npm run dev
```

## 🧪 Testing

The application can be tested using the following scenarios:

* Select a valid country.
* Select a city from the selected country.
* Check whether live weather information is displayed.
* Switch between Celsius and Fahrenheit.
* Refresh the page and verify that the selected unit remains saved.
* Check whether the map displays the correct city location.
* Test API failure and loading states.
* Test the application on different screen sizes.
* Navigate between Home, About, and Contact pages.

