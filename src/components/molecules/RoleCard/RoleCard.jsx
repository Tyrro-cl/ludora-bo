import React from 'react';
import './RoleCard.css';

const RoleCard = ({ title, icon, onClick, ...props }) => {
  return (
    <button
      type="button"
      className="role-card"
      onClick={onClick}
      aria-label={title}
      {...props}
    >
      <span className="role-card__icon">{icon}</span>
    </button>
  );
};

export default RoleCard;
