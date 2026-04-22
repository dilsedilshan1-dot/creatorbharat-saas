import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'md', fullWidth = false, icon, onClick, disabled = false, style = {}, type = "button" }) => {
  let baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: size === 'sm' ? '0.6rem 1.2rem' : size === 'lg' ? '1rem 2.5rem' : '0.8rem 1.8rem',
    fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 600,
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    ...style
  };

  if (!disabled) {
    if (variant === 'primary') {
      baseStyle = { ...baseStyle, backgroundColor: 'var(--primary)', color: '#fff', boxShadow: 'var(--shadow-sm)' };
    } else if (variant === 'secondary') {
      baseStyle = { ...baseStyle, backgroundColor: '#fff', color: 'var(--text-main)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' };
    } else if (variant === 'ghost') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', color: 'var(--text-sec)' };
    }
  } else {
    baseStyle = { ...baseStyle, backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-sec)', border: '1px solid var(--border-color)' };
  }

  return (
    <button
      type={type}
      className={`btn-interaction ${variant === 'primary' ? 'primary-btn' : ''}`}
      style={baseStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => { if (!disabled && variant === 'primary') e.target.style.backgroundColor = 'var(--primary-hover)'; }}
      onMouseLeave={(e) => { if (!disabled && variant === 'primary') e.target.style.backgroundColor = 'var(--primary)'; }}
    >
      {icon && <i className={`ph ${icon}`} style={{ fontSize: '1.2em' }}></i>}
      {children}
    </button>
  );
};
