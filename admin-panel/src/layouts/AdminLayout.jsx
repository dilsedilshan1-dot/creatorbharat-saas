import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('cb_admin_token');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'ph-squares-four' },
    { name: 'User Management', path: '/users', icon: 'ph-users' },
    { name: 'Creator Control', path: '/creators', icon: 'ph-star' },
    { name: 'Campaigns', path: '/campaigns', icon: 'ph-megaphone' },
    { name: 'Moderation', path: '/moderation', icon: 'ph-shield-warning' },
    { name: 'Revenue', path: '/revenue', icon: 'ph-currency-inr' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ padding: '2rem 1.5rem' }}>
        <h2 style={{ color: 'white', marginBottom: '3rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className="ph-fill ph-circles-four" style={{ color: 'var(--admin-primary)' }}></i> CreatorBharat
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              style={({isActive}) => ({
                 display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem',
                 borderRadius: '8px', color: isActive ? 'white' : 'var(--sidebar-text)',
                 background: isActive ? 'var(--admin-primary)' : 'transparent',
                 fontWeight: isActive ? 600 : 500, transition: 'all 0.2s'
              })}
            >
              <i className={`ph ${item.icon}`} style={{ fontSize: '1.25rem' }}></i> {item.name}
            </NavLink>
          ))}
        </nav>

        <button 
           onClick={handleLogout}
           style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
           <i className="ph ph-sign-out"></i> System Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
           <h2 style={{ fontSize: '1.25rem', color: 'var(--admin-text)' }}>Admin Command Center</h2>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <i className="ph ph-bell" style={{ fontSize: '1.5rem', color: 'var(--admin-text-light)', cursor: 'pointer' }}></i>
              <div style={{ width: '40px', height: '40px', background: 'var(--admin-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                 A
              </div>
           </div>
        </header>
        <main className="admin-content">
           <Outlet />
        </main>
      </div>
    </div>
  );
};
