import './NavLineIndicator.css';

/**
 * NavLineIndicator - A vertical line indicator with customizable segments.
 * Used in navigation contexts to show active/inactive states through opacity variations.
 *
 * @param {Object} props - Component props
 * @param {Array<boolean|string>} [props.segments] - Array of segment states (true/visible, false/faded)
 * @param {number} [props.height] - Total height in pixels (default: 96)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement}
 *
 * Usage:
 * <NavLineIndicator segments={[true, false, false, false]} />
 */
const NavLineIndicator = ({ segments = [true, false, false, false], height = 96, className = '' }) => {
  // Validate segments - ensure it's an array
  const segmentArray = Array.isArray(segments) ? segments : [true, false, false, false];
  const segmentHeight = height / segmentArray.length;

  return (
    <div
      className={`nav-line-indicator ${className}`}
      style={{ height: `${height}px` }}
      data-name=".navLineIndicator"
      data-node-id="1428:92902"
    >
      {segmentArray.map((isActive, index) => (
        <div
          key={index}
          className={`nav-line-segment ${isActive ? 'is-active' : ''}`}
          style={{ height: `${segmentHeight}px` }}
          data-name={index === 0 ? 'IndicatorStart' : index === segmentArray.length - 1 ? 'IndicatorEnd' : `Indicator${index}`}
        />
      ))}
    </div>
  );
};

export default NavLineIndicator;
