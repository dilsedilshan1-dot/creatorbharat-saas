import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../services/api';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

const CreatorProfile = () => {
  const { id } = useParams();
  const { state, addToast } = useApp();
  const [creator, setCreator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { 
      const load = async () => setCreator(await API.users.getById(id)); 
      load(); 
  }, [id]);

  if (!creator) return <div className="container flex-center" style={{padding:'8rem 0'}}><div className="skeleton" style={{width: 300, height:40}}></div></div>;

  const handleHire = () => { 
      if (!state.isAuthenticated || state.user?.role !== 'brand') { 
          addToast('Please login as a Brand to send proposals!', 'error'); 
          return; 
      } 
      setShowModal(true); 
  };

  const submitProposal = async (e) => { 
      e.preventDefault(); 
      try {
          await API.messages.send({ senderId: state.user._id, receiverId: creator.userId, type: 'proposal', budget: e.target.budget.value, brief: e.target.brief.value }); 
          setShowModal(false); 
          addToast('Proposal sent to creator dashboard!', 'success'); 
      } catch (err) {
          addToast(err.message, 'error');
      }
  };

  const formatNumber = (num) => num >= 100000 ? (num/100000).toFixed(1) + 'L' : num >= 1000 ? (num/1000).toFixed(1) + 'K' : num;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ height: '280px', background: 'linear-gradient(135deg, var(--text-main), var(--text-sec))' }}></div>
      <div className="container" style={{ position: 'relative', marginTop: '-100px', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
         <div className="animate-slide-up" style={{ width: '340px', background: 'white', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <img src={creator.avatar} style={{ width: '130px', height: '130px', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'block', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} alt="avatar" />
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
                    {creator.name} {creator.verified && <i className="ph-fill ph-seal-check" style={{ color: 'var(--accent-success)' }}></i>}
                </h1>
                <p style={{ color: 'var(--text-sec)', marginBottom: '1rem' }}>@{creator.handle}</p>
            </div>
            
            <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
               <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{formatNumber(creator.followers)}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Followers</div></div>
               <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{creator.er}%</div><div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Engagement</div></div>
               <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>{creator.score}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Score</div></div>
            </div>

            <Button size="lg" fullWidth icon="ph-handshake" onClick={handleHire}>Hire Now</Button>
         </div>

         <div className="animate-slide-up" style={{ flex: 1, marginTop: '100px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="ph ph-package"></i> Service Packages</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {(creator.packages || [{name: 'Standard Deal', price: 15000, desc: 'A dedicated video review.'}]).map((pkg, idx) => (
                <div key={idx} className="card-hover" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{pkg.name}</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>₹{formatNumber(pkg.price)}</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-sec)', marginBottom: '2rem', lineHeight: 1.5 }}>{pkg.desc}</p>
                  <Button variant="secondary" size="md" fullWidth onClick={handleHire}>Select Package</Button>
                </div>
              ))}
            </div>
         </div>
      </div>
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Proposal Details">
          <form onSubmit={submitProposal}>
              <div style={{ marginBottom: '1.5rem' }}><label style={{display:'block', marginBottom:'0.5rem'}}>Budget(₹)</label><input name="budget" type="number" required /></div>
              <div style={{ marginBottom: '2rem' }}><label style={{display:'block', marginBottom:'0.5rem'}}>Brief</label><textarea name="brief" rows="3" required></textarea></div>
              <Button type="submit" fullWidth>Send Proposal</Button>
          </form>
      </Modal>
    </div>
  );
}

export default CreatorProfile;
