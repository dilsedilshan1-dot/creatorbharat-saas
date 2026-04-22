import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import Home from './pages/Home';
import Creators from './pages/Creators';
import Campaigns from './pages/Campaigns';
import Dashboard from './pages/Dashboard';
import CreatorProfile from './pages/CreatorProfile';
import Apply from './pages/Apply';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creator/:id" element={<CreatorProfile />} />
          <Route path="/campaigns" element={<Campaigns />} />
          
          {/* Protected SaaS Routes */}
          <Route path="/apply" element={<Apply />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <footer style={{ padding: '4rem 0', background: 'white', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-sec)' }}>
           <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>CreatorBharat</h2>
           <p>Built for the Indian Creator Economy. © 2026.</p>
        </div>
      </footer>
      <Analytics />
    </>
  );
};

export default App;
