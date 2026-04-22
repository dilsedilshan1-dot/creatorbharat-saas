import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-slide-up container flex-center" style={{ padding: '8rem 0', flexDirection: 'column', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="primary">The missing link in India's creator economy</Badge>
      </div>
      
      <h1 style={{ fontSize: '5.5rem', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '900px' }}>
        Where <span style={{ color: 'var(--text-main)' }}>Brands</span> meet <br/>
        <span style={{ color: 'var(--primary)' }}>Creators.</span>
      </h1>
      
      <p style={{ fontSize: '1.35rem', color: 'var(--text-sec)', maxWidth: '600px', marginBottom: '3rem' }}>
        A premium network for transparent discovery, professional packaging, and direct deal flows.
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
         <Button size="lg" icon="ph-magnifying-glass" onClick={() => navigate('/creators')}>Discover Talent</Button>
         <Button size="lg" variant="secondary" icon="ph-rocket" onClick={() => navigate('/campaigns')}>Browse Campaigns</Button>
      </div>
    </div>
  );
};

export default Home;
