import './StatusRoot.css';
import Icon from '../Icon/Icon';

const StatusRoot = ({ 
  content = 'Placeholder Text',
  text = true,
  icon = true,
  variant = 'Primary',
  iconName = 'circleCheckBig',
  compact = false,
  slots = {},
  className = '',
  style,
}) => {
  const rootClasses = [
    'status-root',
    `status-root-${variant.toLowerCase()}`,
    compact && 'is-compact',
    className,
  ].filter(Boolean).join(' ');

  const iconSize = compact ? 16 : 24;
  const iconColor = variant === 'Secondary'
    ? 'var(--status-icon-color, var(--color-badge-on-track))'
    : 'var(--status-icon-color, var(--color-text-strong))';

  const iconSlot = slots.icon ?? (
    <Icon
      name={iconName}
      size={iconSize}
      color={iconColor}
      className="status-root-icon"
    />
  );

  const textSlot = slots.text ?? content;

  if (variant === 'Secondary') {
    return (
      <div className={rootClasses} style={style}>
        {icon && (
          <div className="status-root-bullet">
            <div className="status-root-icon-container">
              <div className="status-root-icon-mask">
                {iconSlot}
              </div>
              <div className="status-root-icon-color" />
            </div>
          </div>
        )}
        {text && (
          <p className="status-root-text status-root-text-secondary">
            {textSlot}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={rootClasses} style={style}>
      {icon && (
        <div className="status-root-icon-container">
          <div className="status-root-icon-mask">
            {iconSlot}
          </div>
        </div>
      )}
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

