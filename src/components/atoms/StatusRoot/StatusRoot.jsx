import './StatusRoot.css';
import Icon from '../Icon/Icon';

const StatusRoot = ({ 
  content = 'Placeholder Text',
  text = true,
  variant = 'Primary',
  className = ''
}) => {
  const rootClasses = `
    status-root
    status-root-${variant.toLowerCase()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  if (variant === 'Secondary') {
    return (
      <div className={rootClasses}>
        <div className="status-root-bullet">
          <div className="status-root-icon-container">
            <div className="status-root-icon-mask">
              <Icon 
                name="circleCheckBig" 
                size={24}
                color="var(--color-badge-on-track)"
                className="status-root-icon"
              />
            </div>
            <div className="status-root-icon-color" />
          </div>
        </div>
        {text && (
          <p className="status-root-text status-root-text-secondary">
            {content}
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
          <Icon 
            name="circleCheckBig" 
            size={24}
            color="var(--color-text-strong)"
            className="status-root-icon"
          />
        </div>
      </div>
      {text && (
        <p className="status-root-text status-root-text-primary">
          {content}
        </p>
      )}
      <div className="status-root-background" />
    </div>
  );
};

export default StatusRoot;

