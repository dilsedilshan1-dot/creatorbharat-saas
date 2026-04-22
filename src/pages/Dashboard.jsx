import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { state, addToast } = useApp();
  const navigate = useNavigate();
  const user = state.user;
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => { 
      if (!user) {
          navigate('/');
          return;
      }
      const load = async () => { 
          try {
              if(user.role === 'creator') setMessages(await API.messages.getByReceiver()); 
          } catch(err) {
              addToast(err.message, 'error');
          } finally {
              setLoading(false);
          }
      }; 
      load(); 
  }, [user, navigate, addToast]);

  if (!user || loading) return <div className="container" style={{padding:'4rem 0'}}><div className="skeleton" style={{width: 300, height: 40}}></div></div>;

  return (
    <div className="animate-slide-up container" style={{ padding: '4rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Workspace</h1>
        <p style={{ color: 'var(--text-sec)', marginBottom: '3rem', fontSize: '1.1rem' }}>Welcome back, {user.name}.</p>
        
        {user.role === 'creator' && (
          <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
             <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--text-sec)', fontWeight: 600, marginBottom: '1rem' }}>Estimated Pipeline Value</div>
                <div style={{ fontSize: '3rem', fontWeight: 700 }}>₹90K<span style={{fontSize: '1rem', color: 'var(--text-sec)'}}>/mo</span></div>
             </div>
             <div style={{ background: 'linear-gradient(135deg, var(--text-main), #374151)', color: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-md)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--accent-safe)' }}>CreatorBharat PRO+</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Unlock Verified Badge</div>
                  <div style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '1.5rem', lineHeight: 1.5 }}>Rank higher in search results and unlock advanced analytics.</div>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    icon={processingPayment ? 'ph-spinner ph-spin' : 'ph-lock-key-open'} 
                    disabled={processingPayment}
                    onClick={() => {
                        setProcessingPayment(true);
                        addToast('Redirecting to secure Razorpay gateway...', 'info');
                        setTimeout(() => {
                           setProcessingPayment(false);
                           addToast('Payment successful! You are now PRO+', 'success');
                           // In a real app we would update the store here.
                        }, 2500);
                    }}
                  >
                    {processingPayment ? 'Processing...' : 'Upgrade for ₹299'}
                  </Button>
                </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><i className="ph ph-tray"></i> Incoming Proposals</h2>
            
            {messages.length === 0 ? (
               <div className="flex-center" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '4rem', border: '1px dashed var(--text-sec)', flexDirection: 'column' }}>
                  <i className="ph ph-handshake" style={{ fontSize: '3rem', color: 'var(--border-color)', marginBottom: '1rem' }}></i>
                  <h3 style={{ marginBottom: '0.5rem' }}>No pending proposals</h3>
                  <p style={{ color: 'var(--text-sec)' }}>Optimize your profile to attract more top-tier brands.</p>
               </div>
            ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {messages.map(m => (
                   <div key={m.id} className="card-hover" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                       <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                         <h3 style={{ fontSize: '1.1rem' }}>Direct Negotiation</h3>
                         <Badge variant="warning">Pending Review</Badge>
                       </div>
                       <p style={{ color: 'var(--text-sec)', fontSize: '0.95rem' }}><b>Proposed Budget:</b> ₹{m.budget}</p>
                       <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginTop: '0.5rem', maxWidth: '800px', lineHeight: 1.5 }}>"{m.brief}"</p>
                     </div>
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <Button variant="secondary" size="md">Decline</Button>
                       <Button size="md" onClick={()=>addToast('Brand has been notified of your acceptance.', 'success')}>Accept Deal</Button>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </>
        )}

        {user.role === 'brand' && (
           <div className="flex-center" style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '5rem', border: '1px dashed var(--border-color)', flexDirection: 'column' }}>
               <i className="ph ph-megaphone" style={{ fontSize: '3.5rem', color: 'var(--text-sec)', marginBottom: '1.5rem' }}></i>
               <h3 style={{ marginBottom: '1rem' }}>Draft your first campaign</h3>
               <p style={{ color: 'var(--text-sec)', marginBottom: '2rem', textAlign: 'center', maxWidth: '400px' }}>Post a campaign to your target audience and let creators apply directly to you.</p>
               <Button icon="ph-plus" onClick={()=>addToast('Modal coming soon for brands', 'info')}>Post Campaign</Button>
           </div>
        )}
    </div>
  );
};

export default Dashboard;
