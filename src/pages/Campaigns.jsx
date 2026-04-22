import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { CampaignCard } from '../components/campaign/CampaignCard';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';

const Campaigns = () => {
    const { addToast } = useApp();
    const [campaigns, setCampaigns] = useState([]);
    
    useEffect(() => {
        const load = async () => setCampaigns(await API.campaigns.getAll());
        load();
    }, []);

    const handleApply = (campaign) => {
        // Future scope: Open detailed Apply Modal where creator drops a link to sample content
        addToast(`Applying to ${campaign.title} pipeline initiated!`, 'success');
    };

    return (
        <div className="animate-fade-in container" style={{ padding: '4rem 0' }}>
            <div className="flex-between" style={{ marginBottom: '3rem' }}>
               <div>
                 <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Campaign Marketplace</h1>
                 <p style={{ color: 'var(--text-sec)', fontSize: '1.1rem' }}>Find your next brand collaboration exactly in your niche.</p>
               </div>
               <Button icon="ph-magnifying-glass" variant="secondary">Filter Opportunities</Button>
            </div>

            <div className="grid-3 animate-slide-up">
              {campaigns.map(c => (
                  <CampaignCard key={c.id} campaign={c} onApplyClick={handleApply} />
              ))}
            </div>
        </div>
    );
};

export default Campaigns;
