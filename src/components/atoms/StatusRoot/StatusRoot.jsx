import './StatusRoot.css';
import Icon from '../Icon/Icon';

const StatusRoot = ({ 
  content = 'Placeholder Text',
  text = true,
  variant = 'Primary',
  iconName = 'circleCheckBig',
  slots = {},
  className = '',
}) => {
  const rootClasses = `
    status-root
    status-root-${variant.toLowerCase()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconSlot = slots.icon ?? (
    <Icon
      name={iconName}
      size={24}
      color={variant === 'Secondary' ? 'var(--color-badge-on-track)' : 'var(--color-text-strong)'}
      className="status-root-icon"
    />
  );

  const textSlot = slots.text ?? content;

  if (variant === 'Secondary') {
    return (
      <div className={rootClasses}>
        <div className="status-root-bullet">
          <div className="status-root-icon-container">
            <div className="status-root-icon-mask">
              {iconSlot}
            </div>
            <div className="status-root-icon-color" />
          </div>
        </div>
        {text && (
          <p className="status-root-text status-root-text-secondary">
            {textSlot}
          </p>
        )}
      </div>
    );
  }

  // Primary variant
  return (
    <div className={rootClasses}>
      <div className="status-root-icon-container">
        <div className="status-root-icon-mask">
          {iconSlot}
        </div>
      </div>
      {text && (
        <p className="status-root-text status-root-text-primary">
          {textSlot}
        </p>
      )}
      <div className="status-root-background" />
    </div>
  );
};

export default StatusRoot;

