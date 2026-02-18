import './Button.css';
import Icon from '../Icon/Icon';

const Button = ({ 
  children,
  iconStart = null,
  iconEnd = null,
  onClick, 
  type = 'button', 
  variant = 'primary',
  state = 'Idle',
  scale = '1x',
  disabled = false,
  className = '' 
}) => {
  // Map scale to actual button size
  const scaleMap = {
    '1x': 'small',      // 164px, 40px
    '1.25x': 'medium',  // 205px, 50px
    '1.5x': 'large',    // 246px, 60px
    '1.75x': 'xlarge',  // 287px, 70px
    '2x': 'xxlarge'     // 328px, 80px
  };

  const size = scaleMap[scale] || 'small';
  const isDisabled = disabled || state === 'Disabled';
  const buttonState = isDisabled ? 'Disabled' : state;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`button-root button-${variant} button-${size} button-state-${buttonState} ${className}`}
      data-node-id="1542:168776"
    >
      <div className="button-container">
        <div className="button-inner">
          {iconStart && (
            <div className="button-icon-start">
              <Icon name={iconStart} size="24" />
            </div>
          )}
          
          <div className="button-label">
            {children}
          </div>

          {iconEnd && (
            <div className="button-icon-end">
              <Icon name={iconEnd} size="24" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default Button;
