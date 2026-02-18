import NavButtonRoot from '../NavButtonRoot/NavButtonRoot';
import NavLineIndicator from '../../atoms/NavLineIndicator/NavLineIndicator';
import './NavItemsContainer.css';

/**
 * NavItemsContainer - container for nested navigation items with rail indicator.
 * Displays child navigation buttons with a vertical line indicator on the left.
 */
const NavItemsContainer = ({
  items = [],
  className = '',
}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const indicatorHeight = Math.max(48 * items.length, 96);
  const indicatorSegments = Array.from({ length: 4 }, (_, idx) => idx === 0);

  const defaultItem = {
    itemLabel: 'Second Level Item',
    leftIconName: 'Figma',
    leftStatus: { content: '999', variant: 'Primary', iconName: 'CircleCheckBig' },
    iconStart: false,
    iconEnd: false,
    itemText: true,
  };

  return (
    <div 
      className={`nav-items-container ${className}`} 
      data-name="NavItemsContainer" 
      data-node-id="1431:27059"
    >
      <NavLineIndicator height={indicatorHeight} segments={indicatorSegments} />
      
      <div className="nav-items-container-stack">
        {items.map((item, index) => {
          const mergedItem = { ...defaultItem, ...item };
          return (
            <div key={item.id || index} className="nav-items-container-item">
              <NavButtonRoot
                state="Expanded"
                {...mergedItem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavItemsContainer;
