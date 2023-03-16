import React, { useState, useEffect } from 'react';
import { getLocation } from './locationService';
import {LOCATION_API_KEY, WEATHER_API_KEY} from './apiKeys'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Navbar, Container, Form, Button  } from 'react-bootstrap';
import './styles.css';



const Main = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationName = await getLocation(latitude, longitude, LOCATION_API_KEY);
                    setLocation(locationName);

                    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
                    const response = await fetch(weatherApiUrl);
                    const data = await response.json();
                    setWeather(data);


                });
            } catch (error) {
                console.log(error.message);
            }

        };
        fetchData();
    }, []);


    const handleCitySubmit = async (event) => {
        event.preventDefault();
        const cityWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`;
        const response = await fetch(cityWeatherApiUrl);
        const data = await response.json();
        setWeather(data);
        setLocation(data.name);
    };

    return (
        <div style={{ textAlign: 'center' }} >
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container fluid className="nav-container">
                <Navbar.Brand href="#home">Weather</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>
            <div style={{height: "50px"}}></div>
            <Form  onSubmit={handleCitySubmit}>
                <label>
                    <input className="form-control input-box" type="text" placeholder="Enter the city name" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
            </Form>
            {location ? (
                <div>
                    <p>Current location: {location}</p>
                    {weather ? (
                        <div>
                            <p>Current temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                            <p>Current weather: {weather.weather[0].main}</p>
                        </div>
                    ) : (
                        <p>Loading weather...</p>
                    )}
                </div>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default Main;
