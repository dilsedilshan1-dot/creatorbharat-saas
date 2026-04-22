import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import { AdminAPI } from './services/adminAPI';

const ProtectedAdminRoute = ({ children }) => {
    return localStorage.getItem('cb_admin_token') ? children : <Navigate to="/login" replace />;
};

const Dashboard = () => {
    const [metrics, setMetrics] = useState({ totalUsers: 0, activeCampaigns: 0, totalRevenue: 0, spamDetected: 0 });
    
    useEffect(() => {
        AdminAPI.dashboard.getMetrics().then(setMetrics).catch(console.error);
    }, []);

    return (
        <div className="animate-fade-in">
           <h1 style={{ marginBottom: '2rem' }}>Platform Overview</h1>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Total Users</div>
                 <div className="metric-value">{metrics.totalUsers}</div>
                 <div style={{ color: 'var(--admin-green)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Secure Cloud Synced</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Active Campaigns</div>
                 <div className="metric-value" style={{ color: 'var(--admin-saffron)' }}>{metrics.activeCampaigns}</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Pending Alerts</div>
                 <div className="metric-value" style={{ color: 'var(--admin-primary)' }}>{metrics.spamDetected}</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Revenue Value (₹)</div>
                 <div className="metric-value">{(metrics.totalRevenue/100000).toFixed(1)}L</div>
              </div>
           </div>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        AdminAPI.users.getAll().then(setUsers).catch(console.error);
    }, []);

    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '2rem' }}>Global User Directory</h1>
            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role Acquired</th>
                            <th>Status Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td style={{ fontWeight: 600 }}>{u.name}</td>
                                <td>{u.email}</td>
                                <td><span style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                                <td><span className={`status-badge ${u.role === 'admin' ? 'status-active' : 'status-pending'}`}>Audited</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Campaigns = () => <div className="card"><h1 style={{ marginBottom: '1rem' }}>Campaign Moderation</h1><p>Monitor and approve campaigns flowing natively from the MongoDB cluster.</p></div>;

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="creators" element={<div>Creator Validation Matrix Active</div>} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="moderation" element={<div>Global AI Moderation Filters Active</div>} />
        <Route path="revenue" element={<div>Financial Analytics Controller</div>} />
      </Route>
    </Routes>
  );
};

export default App;
