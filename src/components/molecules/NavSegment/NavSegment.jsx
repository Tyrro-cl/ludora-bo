import NavButtonRoot from '../NavButtonRoot/NavButtonRoot';
import NavLineIndicator from '../../atoms/NavLineIndicator/NavLineIndicator';
import './NavSegment.css';

/**
 * NavSegment - groups a primary nav button with optional nested nav buttons and a rail indicator.
 * Supports Expanded/Collapsed states to align with Figma variants.
 */
const NavSegment = ({
  state = 'Collapsed',
  primaryButton = {},
  childrenButtons = [],
  className = '',
}) => {
  const isExpanded = state === 'Expanded';
  const hasChildren = isExpanded && Array.isArray(childrenButtons) && childrenButtons.length > 0;

  const defaultPrimary = {
    itemLabel: 'First Level Item',
    leftIconName: 'Figma',
    leftStatus: { content: '999', variant: 'Primary', iconName: 'CircleCheckBig' },
    rightStatus: { content: '999', variant: 'Primary', iconName: 'CircleCheckBig' },
    endIconName: 'ChevronDown',
  };

  const mergedPrimary = { ...defaultPrimary, ...primaryButton };

  const indicatorHeight = Math.max(48 * Math.max(childrenButtons.length, 1), 96);
  const indicatorSegments = Array.from({ length: 4 }, (_, idx) => idx === 0);

  return (
    <div 
      className={`nav-segment ${!isExpanded ? 'is-collapsed' : ''} ${className}`} 
      data-name="navSegment" 
      data-node-id="1431:25808"
    >
      <NavButtonRoot
        {...mergedPrimary}
        state={isExpanded ? 'Expanded' : 'Collapsed'}
      />

      {hasChildren && (
        <div className="nav-segment-children" data-name="NavItemsContainer">
          <NavLineIndicator height={indicatorHeight} segments={indicatorSegments} />
          <div className="nav-segment-children-container">
            <div className="nav-segment-children-stack">
              {childrenButtons.map((child, index) => (
                <NavButtonRoot
                  key={child.id || index}
                  state="Expanded"
                  itemLabel={child.itemLabel || 'Second Level Item'}
                  leftIconName={child.leftIconName || 'Figma'}
                  leftStatus={child.leftStatus || { content: '999', variant: 'Primary', iconName: 'CircleCheckBig' }}
                  rightStatus={child.rightStatus}
                  iconStart={child.iconStart ?? true}
                  iconEnd={child.iconEnd ?? false}
                  itemText={child.itemText ?? true}
                  className="nav-segment-child-button"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavSegment;
