import './StudentStatus.css';
import Icon from '../Icon/Icon';

const StudentStatus = ({ 
  content = 'Placeholder Text',
  breakpoint = '1920',
  variant = 'Primary',
  iconName = 'circleCheckBig',
  slots = {},
  className = ''
}) => {
  // Determine icon size based on breakpoint
  const iconSize = breakpoint === '320' ? 16 : 24;
  
  const statusClasses = `
    student-status
    student-status-${breakpoint}
    student-status-${variant.toLowerCase()}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const iconSlot = slots.icon ?? (
    <Icon 
      name={iconName}
      size={iconSize}
      color="var(--color-badge-on-track)"
      className="student-status-icon"
    />
  );

  const textSlot = slots.text ?? content;

  const iconContainer = (
    <div className={`student-status-icon-container student-status-icon-${breakpoint}`}>
      <div className="student-status-icon-mask">
        {iconSlot}
      </div>
      <div className="student-status-icon-color" />
    </div>
  );

  const textElement = (
    <p className={`student-status-text student-status-text-${variant.toLowerCase()}`}>
      {textSlot}
    </p>
  );

  return (
    <div className={statusClasses}>
      <div className="student-status-root">
        {iconContainer}
        {textElement}
        {variant === 'Primary' && (
          <div className="student-status-background" />
        )}
      </div>
    </div>
  );
};

export default StudentStatus;

