import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import GasInfo from './pages/GasInfo';
import GasDistribution from './pages/GasDistribution';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50/50">
        <Navigation />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gases" element={<GasInfo />} />
            <Route path="/distribution" element={<GasDistribution />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;