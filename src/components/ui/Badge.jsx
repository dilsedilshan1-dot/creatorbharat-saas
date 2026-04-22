import React from 'react';

export const Badge = ({ children, variant = 'primary', icon }) => {
  let baseClass = 'chip ';
  if (variant === 'primary') baseClass += 'chip-primary';
  else if (variant === 'success') baseClass += 'chip-success';
  else if (variant === 'warning') baseClass += 'chip-warning';
  else baseClass += 'chip-gray';

  return (
    <span className={baseClass}>
      {icon && <i className={`ph ${icon}`}></i>}
      {children}
    </span>
  );
};
