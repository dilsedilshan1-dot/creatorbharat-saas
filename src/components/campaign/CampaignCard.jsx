import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';

export const CampaignCard = ({ campaign, onApplyClick }) => {
  const { state } = useApp();
  const formatNumber = (num) => num >= 100000 ? (num/100000).toFixed(1) + 'L' : num >= 1000 ? (num/1000).toFixed(1) + 'K' : num;

  return (
    <div className="card-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Badge variant="primary">{campaign.niche}</Badge>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-sec)', fontWeight: 600 }}>
          {campaign.slots} slots open
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{campaign.title}</h3>
      
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
        ₹{formatNumber(campaign.budget)}
      </div>
      
      <p style={{ fontSize: '0.9rem', color: 'var(--text-sec)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.5 }}>
        {campaign.requirements}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {campaign.platforms.map(p => <Badge key={p} variant="gray">{p}</Badge>)}
      </div>
      
      <Button 
        fullWidth 
        disabled={state.user?.role !== 'creator'}
        onClick={() => onApplyClick(campaign)}
        title={state.user?.role !== 'creator' ? 'Only creators can apply to campaigns' : ''}
      >
        {state.user?.role !== 'creator' ? 'Apply (Creator Only)' : 'Apply Now'}
      </Button>
    </div>
  );
};
