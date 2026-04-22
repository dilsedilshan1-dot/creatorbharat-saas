import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAPI } from '../services/adminAPI';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const data = await AdminAPI.auth.login(credentials.email, credentials.password);
            if (data.role !== 'admin') {
                AdminAPI.auth.logout();
                throw new Error('Access denied. Admin privileges required.');
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--admin-bg)', padding: '1.5rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--admin-primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>CreatorBharat</h1>
                    <p style={{ color: 'var(--admin-text-light)' }}>Admin Command Center Auth</p>
                </div>
                
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Admin Email</label>
                        <input 
                            type="email" 
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                            value={credentials.email}
                            onChange={e => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Security PIN / Password</label>
                        <input 
                            type="password" 
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
                            value={credentials.password}
                            onChange={e => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ background: 'var(--admin-primary)', color: 'white', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem' }}
                    >
                        {loading ? 'Authenticating...' : 'Establish Secure Connection'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
