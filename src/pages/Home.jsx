import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="animate-slide-up container flex-center" style={{ padding: '8rem 0', flexDirection: 'column', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Badge variant="primary">Trusted by 10,000+ Indian Brands</Badge>
      </div>
      
      <h1 style={{ fontSize: '5.5rem', lineHeight: 1.05, marginBottom: '2rem', maxWidth: '900px' }}>
        Discover the <span style={{ color: 'var(--primary)' }}>Top 1%</span> of <br/>
        <span style={{ color: 'var(--text-main)' }}>Indian Creators.</span>
      </h1>
      
      <p style={{ fontSize: '1.35rem', color: 'var(--text-sec)', maxWidth: '700px', marginBottom: '3rem', lineHeight: 1.6 }}>
        The most powerful invite-only creator marketplace. Automate your outreach, verify authentic engagement rates, and handle payouts instantly.
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
         <Button size="lg" icon="ph-lightning" onClick={() => navigate('/creators')}>Hire Creators</Button>
         <Button size="lg" variant="secondary" icon="ph-identification-card" onClick={() => navigate('/apply')}>Get Listed (Creators)</Button>
      </div>
      
      <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <div><div style={{fontSize:'2rem', fontWeight:700}}>₹20Cr+</div><div style={{color:'var(--text-sec)', fontSize:'0.9rem'}}>Creator Payouts</div></div>
          <div><div style={{fontSize:'2rem', fontWeight:700}}>4.8M+</div><div style={{color:'var(--text-sec)', fontSize:'0.9rem'}}>Audience Reach</div></div>
          <div><div style={{fontSize:'2rem', fontWeight:700}}>Zero</div><div style={{color:'var(--text-sec)', fontSize:'0.9rem'}}>Hidden Platform Fees</div></div>
      </div>
    </div>
    </>
  );
};

export default Home;
