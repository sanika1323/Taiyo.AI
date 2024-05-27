import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';
import './ChartsMaps.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const LiveGraph = () => {
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
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
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
      <h2>Live Records</h2>
      <div className="chart">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LiveGraph;
