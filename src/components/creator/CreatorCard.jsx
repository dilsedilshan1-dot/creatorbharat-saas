import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CreatorCard = ({ creator }) => {
  const navigate = useNavigate();
  const formatNumber = (num) => num >= 100000 ? (num/100000).toFixed(1) + 'L' : num >= 1000 ? (num/1000).toFixed(1) + 'K' : num;

  return (
    <div className="card-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <img 
            src={creator.avatar} 
            alt={creator.name} 
            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div>
          <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {creator.name} 
            {creator.verified && <i className="ph-fill ph-seal-check" style={{ color: 'var(--accent-success)' }}></i>}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-sec)' }}>@{creator.handle}</p>
        </div>
      </div>
      
      <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1.5rem', flex: 1 }}>
        {creator.bio}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <Badge variant="gray">{creator.niche}</Badge>
        <Badge variant="gray" icon="ph-map-pin">{creator.city}</Badge>
        {creator.platforms.map(p => <Badge key={p} variant="primary">{p}</Badge>)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700 }}>{formatNumber(creator.followers)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Followers</div>
        </div>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700 }}>{creator.er}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Engagement</div>
        </div>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{creator.score}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sec)' }}>Score</div>
        </div>
      </div>

      <Button variant="secondary" fullWidth onClick={() => navigate(`/creator/${creator._id}`)}>
        View Full Profile
      </Button>
    </div>
  );
};
