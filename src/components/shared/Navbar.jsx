import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { API } from '../../services/api';

export const Navbar = () => {
  const { state, loginUser, logoutUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (type) => {
    try {
        const email = type === 'creator' ? 'rohan@example.com' : 'muscle@max.com';
        await loginUser(email, 'password123'); // Password hardcoded for 1-click test flow
        navigate('/dashboard');
    } catch (error) {
        // Error toast handled centrally in Context
    }
  };

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
      <div className="container flex-between">
        <h1 
            className="btn-interaction" 
            style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'var(--primary)' }} 
            onClick={() => navigate('/')}
        >
          CreatorBharat
        </h1>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 500 }}>
          <NavLink to="/creators" style={({isActive}) => ({ color: isActive ? 'var(--text-main)' : 'var(--text-sec)', transition: 'color 0.2s' })}>
            Discover
          </NavLink>
          <NavLink to="/campaigns" style={({isActive}) => ({ color: isActive ? 'var(--text-main)' : 'var(--text-sec)', transition: 'color 0.2s' })}>
            Campaigns
          </NavLink>
        </div>
        
        {!state.isAuthenticated ? (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="ghost" onClick={() => handleLogin('brand')}>Brand Login</Button>
            <Button variant="secondary" onClick={() => handleLogin('creator')}>Creator Login</Button>
            <Button onClick={() => navigate('/apply')}>Join Network</Button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <i className="ph ph-bell btn-interaction" style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-sec)' }}></i>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <div 
              className="btn-interaction" 
              style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }} 
              onClick={() => { logoutUser(); navigate('/'); }} 
              title="Logout"
            >
              {state.user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
