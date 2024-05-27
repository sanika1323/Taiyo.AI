import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/charts-maps">Charts & Maps</Link></li>
            <li><Link to="/covid-stats">Covid Stats</Link></li>
        </ul>
    </div>
    );
};

export default Sidebar;