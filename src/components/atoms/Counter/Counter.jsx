import './Counter.css';

const Counter = ({ 
  count = 0, 
  state = 'Default',
  variant = 'Default',
  size = 'medium',
  className = '' 
}) => {
  const displayCount = count > 99 ? '99+' : String(count).padStart(2, '0');
  const isSelected = state === 'Selected';
  const isAlert = variant === 'Alert';
  const isSmall = size === 'small';
  
  return (
    <div 
      className={`counter ${isSelected ? 'is-selected' : ''} ${isAlert ? 'is-alert' : ''} ${isSmall ? 'is-small' : ''} ${className}`}
      data-node-id="707:25639"
    >
      <div className="counter-container">
        <div className="counter-content">
          <div className="counter-text-holder">
            <span className="counter-text">{displayCount}</span>
          </div>
        </div>
        <div className="counter-background" />
      </div>
    </div>
  );
};

export default Counter;
