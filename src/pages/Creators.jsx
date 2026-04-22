import React, { useState, useEffect, useMemo } from 'react';
import { API } from '../services/api';
import { CreatorCard } from '../components/creator/CreatorCard';
import { Button } from '../components/ui/Button';

const Creators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ type: '', niche: '', platform: '', city: '', sortBy: 'score' });
  
    useEffect(() => {
      const load = async () => {
          try {
              setCreators(await API.users.getCreators());
          } catch(err) {
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
      load();
    }, []);
  
    const filteredAndSortedCreators = useMemo(() => {
      let result = creators;
      if (searchTerm) result = result.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.bio.toLowerCase().includes(searchTerm.toLowerCase()));
      if (filters.type) result = result.filter(c => c.creatorType === filters.type);
      if (filters.niche) result = result.filter(c => c.niche === filters.niche);
      if (filters.platform) result = result.filter(c => c.platforms.includes(filters.platform));
      if (filters.city) result = result.filter(c => c.city === filters.city);
  
      return result.sort((a, b) => {
        if (filters.sortBy === 'followers') return b.followers - a.followers;
        if (filters.sortBy === 'er') return b.er - a.er;
        return b.score - a.score;
      });
    }, [creators, filters, searchTerm]);
  
    return (
      <div className="animate-fade-in container" style={{ padding: '3rem 0', display: 'flex', gap: '2rem' }}>
        
        {/* LEFT: FILTER SIDEBAR */}
        <aside style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '100px', background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="ph ph-sliders"></i> Filters
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Search</label>
              <div style={{ position: 'relative' }}>
                <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-sec)' }}></i>
                <input 
                  type="text" 
                  placeholder="Name or keyword..." 
                  style={{ paddingLeft: '2.5rem' }} 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>
  
            {[
              { label: 'Role', key: 'type', options: ['Content Creator', 'Influencer', 'Photographer', 'Video Editor', 'UGC Creator'] },
              { label: 'Niche', key: 'niche', options: ['Travel', 'Fitness', 'Tech', 'Food', 'Fashion', 'Finance'] },
              { label: 'Platform', key: 'platform', options: ['Instagram', 'YouTube', 'Twitter', 'LinkedIn'] },
              { label: 'City', key: 'city', options: ['Mumbai', 'Delhi', 'Bangalore', 'Jaipur', 'Pune'] }
            ].map(group => (
              <div key={group.key} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{group.label}</label>
                <select value={filters[group.key]} onChange={(e) => setFilters({...filters, [group.key]: e.target.value})}>
                  <option value="">All {group.label}s</option>
                  {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
            
            <Button variant="secondary" fullWidth onClick={() => { setSearchTerm(''); setFilters({type:'', niche:'', platform:'', city:'', sortBy:'score'}); }}>Reset Filters</Button>
          </div>
        </aside>
  
        {/* RIGHT: RESULTS GRID */}
        <section style={{ flex: 1 }}>
          <div className="flex-between" style={{ marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem' }}>Discover Creators</h2>
              <p style={{ color: 'var(--text-sec)' }}>Showing {filteredAndSortedCreators.length} verified talents</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-sec)' }}>Sort by:</span>
              <select style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 1rem' }} value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
                <option value="score">Creator Score</option>
                <option value="followers">Highest Followers</option>
                <option value="er">Engagement Rate</option>
              </select>
            </div>
          </div>
  
          {loading ? (
             <div className="grid-3">
                 <div className="skeleton" style={{ height: '300px' }}></div>
                 <div className="skeleton" style={{ height: '300px' }}></div>
                 <div className="skeleton" style={{ height: '300px' }}></div>
             </div>
          ) : filteredAndSortedCreators.length === 0 ? (
             <div className="animate-scale-in flex-center" style={{ padding: '6rem 0', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', flexDirection: 'column' }}>
                <i className="ph ph-ghost" style={{ fontSize: '3.5rem', color: 'var(--text-sec)', marginBottom: '1.5rem' }}></i>
                <h3 style={{ marginBottom: '0.5rem' }}>No creators matched your criteria</h3>
                <p style={{ color: 'var(--text-sec)', marginBottom: '1.5rem' }}>Try broadening your search or clearing filters.</p>
                <Button variant="secondary" onClick={() => { setSearchTerm(''); setFilters({type:'', niche:'', platform:'', city:'', sortBy:'score'}); }}>Clear all filters</Button>
             </div>
          ) : (
            <div className="grid-3 animate-slide-up">
              {filteredAndSortedCreators.map(c => <CreatorCard key={c._id} creator={c} />)}
            </div>
          )}
        </section>
      </div>
    );
};
  
export default Creators;
