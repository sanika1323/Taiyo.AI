import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CovidStats = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://disease.sh/v3/covid-19/countries');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Covid Statistics by Country</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered w-100">
                    <thead className="thead-dark">
                        <tr>
                            <th>Country</th>
                            <th>Flag</th>
                            <th>Cases</th>
                            <th>Deaths</th>
                            <th>Recovered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country) => (
                            <tr key={country.countryInfo._id}>
                                <td>{country.country}</td>
                                <td>
                                    <img src={country.countryInfo.flag} alt={`Flag of ${country.country}`} style={{ width: 30, height: 20 }} />
                                </td>
                                <td>{country.cases.toLocaleString()}</td>
                                <td>{country.deaths.toLocaleString()}</td>
                                <td>{country.recovered.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CovidStats;
