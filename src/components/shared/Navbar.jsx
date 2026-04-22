import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import AuthModal from '../auth/AuthModal';

export const Navbar = () => {
  const { state, logoutUser } = useApp();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
    <nav style={{ padding: '1.25rem 0', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
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
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="ghost" onClick={() => setShowAuth(true)}>Log in</Button>
            <Button onClick={() => setShowAuth(true)}>Sign Up</Button>
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
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};
