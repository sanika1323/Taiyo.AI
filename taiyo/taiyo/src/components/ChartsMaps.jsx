import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ChartsMaps.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartsMaps = () => {
    const [covidData, setCovidData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then((response) => response.json())
            .then((data) => {
                setCovidData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    const chartData = {
        labels: ['Total Cases', 'Total Deaths', 'Total Recovered', 'Active Cases', 'Critical Cases'],
        datasets: [
            {
                label: 'COVID-19 Statistics',
                data: [
                    covidData.cases,
                    covidData.deaths,
                    covidData.recovered,
                    covidData.active,
                    covidData.critical,
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Charts & Maps</h2>
            <div className="stats">
                <h3>Global COVID-19 Statistics</h3>
                <ul>
                    <li>Total Cases: {covidData.cases.toLocaleString()}</li>
                    <li>Total Deaths: {covidData.deaths.toLocaleString()}</li>
                    <li>Total Recovered: {covidData.recovered.toLocaleString()}</li>
                    <li>Active Cases: {covidData.active.toLocaleString()}</li>
                    <li>Critical Cases: {covidData.critical.toLocaleString()}</li>
                </ul>
            </div>
            <div className="chart">
                {/* Use an <a> tag with href to navigate */}
                <a> <Link to="/live-graph" className="primary-button">Go to Live Graph</Link> </a>
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="map">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default ChartsMaps;
