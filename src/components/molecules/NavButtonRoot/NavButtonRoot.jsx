import Icon from '../../atoms/Icon/Icon';
import StatusRoot from '../../atoms/StatusRoot/StatusRoot';
import './NavButtonRoot.css';

/**
 * NavButtonRoot - A flexible navigation button with optional status badges, icons, and text.
 * Composed of: left icon, status badge, item label, right status badge, and right icon (chevron).
 *
 * @param {Object} props
 * @param {boolean} [props.iconStart=true] - Show left icon slot
 * @param {boolean} [props.iconEnd=true] - Show right icon/chevron slot
 * @param {boolean} [props.itemText=true] - Show item label text
 * @param {Object} [props.leftStatus] - Left status badge config { content, variant, iconName }
 * @param {Object} [props.rightStatus] - Right status badge config { content, variant, iconName }
 * @param {string} [props.itemLabel] - Item label text
 * @param {string} [props.leftIconName] - Left icon name (Lucide)
 * @param {string} [props.endIconName='ChevronDown'] - Right icon name
 * @param {('Expanded'|'Collapsed')} [props.state='Expanded'] - Visual variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @returns {React.ReactElement}
 *
 * Usage:
 * <NavButtonRoot
 *   itemLabel="Placeholder Item"
 *   leftStatus={{ content: 'Placeholder Text', variant: 'Primary' }}
 *   rightStatus={{ content: 'Placeholder Text', variant: 'Primary' }}
 * />
 */
const NavButtonRoot = ({
  iconStart = true,
  iconEnd = true,
  itemText = true,
  leftStatus,
  rightStatus,
  itemLabel = 'Placeholder Item',
  leftIconName = 'Figma',
  endIconName = 'ChevronDown',
  state = 'Expanded',
  className = '',
  onClick,
}) => {
  const isCollapsed = state === 'Collapsed';

  if (isCollapsed) {
    const badgeConfig = leftStatus || rightStatus || { content: 'Placeholder Text', variant: 'Primary', iconName: 'CircleCheckBig' };

    return (
      <button
        className={`nav-button-root is-collapsed ${className}`}
        data-name=".navButtonRoot"
        data-node-id="1428:89250"
        onClick={onClick}
      >
        <div className="nav-button-collapsed">
          <StatusRoot
            content={badgeConfig.content}
            variant={badgeConfig.variant || 'Primary'}
            iconName={badgeConfig.iconName || 'CircleCheckBig'}
            className="nav-button-status nav-button-status-start"
          />
          <div className="nav-button-icon nav-button-icon-start">
            <Icon name={leftIconName} size={20} />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      className={`nav-button-root ${className}`}
      data-name=".navButtonRoot"
      data-node-id="661:63277"
      onClick={onClick}
    >
      <div className="nav-button-container">
        {/* Left Section: Icon + Status + Label */}
        <div className="nav-button-leading">
          {/* Left Icon */}
          {iconStart && (
            <div className="nav-button-icon nav-button-icon-start">
              <Icon name={leftIconName} size={20} />
            </div>
          )}

          {/* Left Status Badge */}
          {leftStatus && (
            <StatusRoot
              content={leftStatus.content || 'Placeholder Text'}
              variant={leftStatus.variant || 'Primary'}
              iconName={leftStatus.iconName || 'CircleCheckBig'}
              className="nav-button-status nav-button-status-start"
            />
          )}

          {/* Item Label */}
          {itemText && <span className="nav-button-label">{itemLabel}</span>}
        </div>

        {/* Right Section: Status + Icon */}
        <div className="nav-button-trailing">
          {/* Right Status Badge */}
          {rightStatus && (
            <StatusRoot
              content={rightStatus.content || 'Placeholder Text'}
              variant={rightStatus.variant || 'Primary'}
              iconName={rightStatus.iconName || 'CircleCheckBig'}
              className="nav-button-status nav-button-status-end"
            />
          )}

          {/* Right Icon (usually chevron) */}
          {iconEnd && (
            <div className="nav-button-icon nav-button-icon-end">
              <Icon name={endIconName} size={20} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default NavButtonRoot;
