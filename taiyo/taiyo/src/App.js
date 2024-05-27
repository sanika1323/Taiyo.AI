// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Contact from './components/Contact';
import ChartsMaps from './components/ChartsMaps';
import CovidStats from './components/CovidStats';
import LiveGraph from './components/LiveGraph';
function App() {
    return (
      <Router>
      <div className="App">
          <Sidebar />
          <div className="content">
              <Routes>
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/charts-maps" element={<ChartsMaps />} />
                  <Route path="/covid-stats" element={<CovidStats />} />
                  <Route path="live-graph" element={<LiveGraph/>} />
                  <Route path="/" element={<h1>Welcome to My Website</h1>} />
              </Routes>
          </div>
      </div>
  </Router>
    );
}

export default App;
