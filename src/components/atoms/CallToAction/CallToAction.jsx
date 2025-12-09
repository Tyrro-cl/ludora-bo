import './CallToAction.css';

const CallToAction = ({
  children = 'Placeholder',
  variant = 'primary',
  state = 'idle',
  disabled = false,
  selected = false,
  onClick,
  className = '',
  icon = null,
  showBelow = false,
}) => {
  // Determine state classes
  const stateClass = disabled ? 'cta-disabled' : selected ? 'cta-selected' : state;
  
  // Combine classes
  const ctaClasses = `
    cta 
    cta-${variant} 
    cta-${stateClass}
    ${showBelow ? 'cta-below' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={ctaClasses}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {/* Root container */}
      <div className="cta-root">
        {/* Main container with icon and text */}
        <div className="cta-container">
          {/* Icon slot */}
          {icon && (
            <div className="cta-icon-slot">
              <div className="cta-icon-wrapper">
                {typeof icon === 'string' ? (
                  <img src={icon} alt="" className="cta-icon-image" />
                ) : (
                  icon
                )}
              </div>
            </div>
          )}
          
          {/* Text content */}
          <span className="cta-text">{children}</span>
        </div>

        {/* Background styling */}
        <div className="cta-background" />
      </div>

      {/* Below text (for Tertiary variant) */}
      {showBelow && (
        <span className="cta-below-text">{children}</span>
      )}
    </button>
  );
};

export default CallToAction;
