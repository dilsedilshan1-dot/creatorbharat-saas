import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { loginUser, registerUser } = useApp();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'creator'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await loginUser(formData.email, formData.password);
            } else {
                await registerUser(formData);
            }
            onClose();
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-scale-in" style={{ background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '24px', padding: '3rem', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-sec)' }}>
                    &times;
                </button>
                
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                        {isLogin ? 'Welcome back.' : 'Join CreatorBharat.'}
                    </h2>
                    <p style={{ color: 'var(--text-sec)' }}>{isLogin ? 'Enter your details to access your dashboard.' : 'The premium network for creators and brands.'}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>Account Type</label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <button type="button" onClick={() => setFormData({...formData, role: 'creator'})} style={{ padding: '0.75rem', borderRadius: '12px', border: `1px solid ${formData.role === 'creator' ? 'var(--primary)' : 'var(--border-color)'}`, background: formData.role === 'creator' ? 'rgba(0,102,255,0.05)' : 'transparent', color: formData.role === 'creator' ? 'var(--primary)' : 'var(--text-main)', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}>Creator</button>
                                    <button type="button" onClick={() => setFormData({...formData, role: 'brand'})} style={{ padding: '0.75rem', borderRadius: '12px', border: `1px solid ${formData.role === 'brand' ? '#111' : 'var(--border-color)'}`, background: formData.role === 'brand' ? '#111' : 'transparent', color: formData.role === 'brand' ? '#fff' : 'var(--text-main)', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s' }}>Brand</button>
                                </div>
                            </div>
                            <input type="text" placeholder="Full Name or Brand Name" required onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.95rem' }} />
                        </>
                    )}
                    
                    <input type="email" placeholder="Email address" required onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.95rem' }} />
                    <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.95rem' }} />
                    
                    <button disabled={loading} style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--text-main)', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem', transition: 'all 0.2s ease' }}>
                        {loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-sec)' }}>
                    {isLogin ? "Don't have an account? " : "Already registered? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 500 }}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
