import React, { useState, useEffect } from 'react';
import { getLocation } from './locationService';
import {LOCATION_API_KEY, WEATHER_API_KEY} from './apiKeys'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Navbar, Container, Form, Card, Nav } from 'react-bootstrap';
import './styles.css';
import { FaGithub } from 'react-icons/fa';






const Main = () => {
    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');

    const GithubLink = () => {
        return (
            <Nav.Link href="https://github.com/AleenaAlby/weather-react-now" style={{ color: 'black' }}>
                <FaGithub /> Github
            </Nav.Link>
        );
    };

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
            <Navbar variant="dark" expand="lg" className="nav-container">
                <Container fluid >
                <Navbar.Brand className="nav-title">Weather Watchers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <GithubLink />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Form  onSubmit={handleCitySubmit} className="cont mb-3">
                <label>

                    <input className="form-control input-box" type="text"  aria-label="Search" aria-describedby="search-button" placeholder="Search for location" value={city} onChange={(e) => setCity(e.target.value)} />

                </label>
            </Form>
            {location ? (

                <div style={{ margin: '0 auto', maxWidth: '400px' }}>
                    <Card>
                        <Card.Body>
                            <h4> Current Weather</h4>
                            <p className="card-text">Location: {location}</p>
                            {weather ? (
                                <div>
                                    <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                                    <p>Weather: {weather.weather[0].main}</p>
                                </div>
                            ) : (
                                <p>Loading weather...</p>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            ) : (
                <p>Loading location...</p>
            )}


        </div>
    );
};

export default Main;
