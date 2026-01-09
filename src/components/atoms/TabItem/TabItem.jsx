import './TabItem.css';

const TabItem = ({ 
  label = 'Tab', 
  active = false, 
  showIcon = false,
  icon = null,
  onClick, 
  className = '' 
}) => {
  return (
    <button 
      className={`tab-item ${active ? 'tab-item--active' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="tab-item__content">
        {showIcon && active && icon && (
          <span className="tab-item__icon">
            {icon}
          </span>
        )}
        <span className="tab-item__label">{label}</span>
      </div>
      <div className="tab-item__indicator" />
    </button>
  );
};

export default TabItem;
