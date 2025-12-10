import { useState } from 'react';
import SidebarMenuItem from '../../molecules/SidebarMenuItem/SidebarMenuItem';
import Icon from '../../atoms/Icon/Icon';
import './SideDropMenu.css';

const SideDropMenu = ({ 
  title = 'Activités',
  items = [],
  isOpen = false,
  leadingIcon = 'activities',
  toggleIconExpanded = 'chevronDown',
  toggleIconCollapsed = 'plus',
  slots = {},
  onToggle,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  
  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={`side-drop-menu ${className}`}>
      <button 
        className="side-drop-menu-header" 
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <div className="side-drop-menu-header-content">
          {slots.headerIcon ?? <Icon name={leadingIcon} size={24} />}
          <span className="side-drop-menu-title">{slots.title ?? title}</span>
        </div>
        {slots.toggleIcon ?? (
          <Icon 
            name={isExpanded ? toggleIconExpanded : toggleIconCollapsed} 
            size={24}
            className={`side-drop-menu-toggle-icon ${isExpanded ? 'expanded' : ''}`}
          />
        )}
      </button>
      
      {isExpanded && (
        <div className="side-drop-menu-content">
          {items.map((item, index) => (
            <SidebarMenuItem
              key={item.id || index}
              label={item.label}
              icon={item.icon}
              count={item.count}
              isSelected={item.isSelected}
              onClick={item.onClick}
              hasIcon={item.hasIcon !== false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideDropMenu;
