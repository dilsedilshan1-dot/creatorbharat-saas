import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';

// Mocked Pages (to be expanded)
const Dashboard = () => {
    return (
        <div className="animate-fade-in">
           <h1 style={{ marginBottom: '2rem' }}>Platform Overview</h1>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Total Users</div>
                 <div className="metric-value">1,450</div>
                 <div style={{ color: 'var(--admin-green)', fontSize: '0.85rem', marginTop: '0.5rem' }}>+12% this week</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Active Campaigns</div>
                 <div className="metric-value" style={{ color: 'var(--admin-saffron)' }}>89</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Pending Approvals</div>
                 <div className="metric-value" style={{ color: 'var(--admin-primary)' }}>12</div>
              </div>
              <div className="card">
                 <div style={{ color: 'var(--admin-text-light)', marginBottom: '0.5rem' }}>Revenue YTD</div>
                 <div className="metric-value">₹24.5L</div>
              </div>
           </div>
        </div>
    );
};

const Users = () => {
    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '2rem' }}>User Management</h1>
            <div className="card table-container">
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 600 }}>Rohan Fitness</td>
                            <td>rohan@example.com</td>
                            <td>Creator</td>
                            <td><span className="status-badge status-active">Verified</span></td>
                            <td><button style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}>Manage</button></td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 600 }}>SpamBot 2026</td>
                            <td>spam@bot.com</td>
                            <td>Creator</td>
                            <td><span className="status-badge status-banned">Banned</span></td>
                            <td><button style={{ padding: '0.25rem 0.75rem', cursor: 'pointer' }}>Manage</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Campaigns = () => <div className="card"><h1 style={{ marginBottom: '1rem' }}>Campaign Moderation</h1><p>Monitor and approve campaigns.</p></div>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="creators" element={<div>Creator Approval Queue</div>} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="moderation" element={<div>Moderation Tools</div>} />
        <Route path="revenue" element={<div>Revenue Controls</div>} />
      </Route>
    </Routes>
  );
};

export default App;
