import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { API } from '../services/api';
import { Button } from '../components/ui/Button';

const Apply = () => {
    const { dispatch, addToast } = useApp();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    // Form State
    const [formData, setFormData] = useState({
        name: '', handle: '', bio: '',
        niche: 'Fitness', city: 'Mumbai', followers: '', 
        er: '', platforms: ['Instagram'], packages: []
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePlatformToggle = (platform) => {
        setFormData(prev => ({
            ...prev,
            platforms: prev.platforms.includes(platform) 
                ? prev.platforms.filter(p => p !== platform) 
                : [...prev.platforms, platform]
        }));
    };

    const submitApplication = async (e) => {
        e.preventDefault();
        try {
            // Generate basic package placeholder to prevent undefined crashes later
            const packagePayload = [{ name: 'Standard Collaboration', price: 15000, desc: 'Detailed integration.' }];
            const newCreator = await API.users.create({ ...formData, packages: packagePayload, avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=random` });
            
            // Auto Login as the newly created user
            dispatch({ type: 'LOGIN', payload: newCreator });
            addToast('Creator Profile verified and created!', 'success');
            navigate('/dashboard');
        } catch (error) {
            addToast('Error setting up profile', 'error');
        }
    };

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '600px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Join CreatorBharat</h1>
                <p style={{ color: 'var(--text-sec)' }}>Step {step} of 2 — Let's build your premium portfolio.</p>
            </div>

            <form onSubmit={step === 2 ? submitApplication : (e) => { e.preventDefault(); setStep(2); }}>
                <div className="animate-slide-up" style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-glass)', border: '1px solid var(--border-color)' }}>
                    
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Basic Information</h2>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div><label style={{ display:'block', marginBottom:'0.5rem' }}>Full Name</label><input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rohan Sharma" /></div>
                                <div><label style={{ display:'block', marginBottom:'0.5rem' }}>Social Handle</label><input required name="handle" value={formData.handle} onChange={handleChange} placeholder="rohan_fitness" /></div>
                                <div><label style={{ display:'block', marginBottom:'0.5rem' }}>Bio</label><textarea required name="bio" value={formData.bio} onChange={handleChange} placeholder="I review premium lifestyle brands..." rows="3" /></div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display:'block', marginBottom:'0.5rem' }}>Niche</label>
                                        <select name="niche" value={formData.niche} onChange={handleChange}>
                                            <option value="Fitness">Fitness</option>
                                            <option value="Tech">Tech</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Fashion">Fashion</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display:'block', marginBottom:'0.5rem' }}>City</label>
                                        <select name="city" value={formData.city} onChange={handleChange}>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Bangalore">Bangalore</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" fullWidth style={{ marginTop: '2rem' }}>Continue to Stats</Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Analytics & Reach</h2>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div><label style={{ display:'block', marginBottom:'0.5rem' }}>Total Followers</label><input type="number" required name="followers" value={formData.followers} onChange={handleChange} placeholder="e.g. 150000" /></div>
                                    <div><label style={{ display:'block', marginBottom:'0.5rem' }}>Engagement Rate (%)</label><input type="number" step="0.1" required name="er" value={formData.er} onChange={handleChange} placeholder="e.g. 6.5" /></div>
                                </div>
                                
                                <div>
                                    <label style={{ display:'block', marginBottom:'0.5rem' }}>Top Platforms</label>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {['Instagram', 'YouTube', 'Twitter', 'LinkedIn'].map(p => (
                                            <div 
                                                key={p} 
                                                className="btn-interaction"
                                                onClick={() => handlePlatformToggle(p)} 
                                                style={{ padding: '0.75rem 1.25rem', border: `1px solid ${formData.platforms.includes(p) ? 'var(--primary)' : 'var(--border-color)'}`, borderRadius: 'var(--radius-full)', background: formData.platforms.includes(p) ? '#FEF2F2' : '#fff', color: formData.platforms.includes(p) ? 'var(--primary)' : 'var(--text-sec)', cursor: 'pointer', fontWeight: 600 }}
                                            >
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <Button variant="secondary" onClick={() => setStep(1)} fullWidth>Back</Button>
                                <Button type="submit" fullWidth>Launch Profile</Button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Apply;
