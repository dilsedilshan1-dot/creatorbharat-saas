import React, { useEffect } from 'react';

export const Modal = ({ isOpen, onClose, title, children, width = '500px' }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="glass-modal-overlay">
      <div className="animate-scale-in" style={{ 
        background: 'white', width: width, maxWidth: '90%', 
        borderRadius: 'var(--radius-xl)', padding: '2.5rem', 
        boxShadow: 'var(--shadow-glass)', position: 'relative' 
      }}>
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          {title && <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{title}</h2>}
          <i className="ph ph-x btn-interaction" style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-sec)' }} onClick={onClose}></i>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
