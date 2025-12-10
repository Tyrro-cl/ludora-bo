import Icon from '../../atoms/Icon/Icon';
import Counter from '../../atoms/Counter/Counter';
import './SidebarMenuItem.css';

const SidebarMenuItem = ({ 
  label,
  icon = 'activities',
  count,
  isSelected = false,
  isHover = false,
  hasIcon = true,
  slots = {},
  onClick,
  className = ''
}) => {
  const itemClass = `sidebar-menu-item ${isSelected ? 'selected' : ''} ${isHover ? 'hover' : ''} ${className}`;

  const iconSlot = slots.icon ?? (
    hasIcon ? (
      <Icon 
        name={icon} 
        size={24}
        color={isSelected ? 'var(--color-primary, #6366f1)' : 'var(--color-cloud-40, #b2b0b5)'}
      />
    ) : null
  );

  const labelSlot = slots.label ?? label;
  const badgeSlot = slots.badge ?? (
    count !== undefined && count !== null ? <Counter count={count} variant="default" /> : null
  );
  
  return (
    <button className={itemClass} onClick={onClick}>
      <div className="sidebar-menu-item-content">
        {iconSlot}
        <span className="sidebar-menu-item-label">{labelSlot}</span>
      </div>
      {badgeSlot}
    </button>
  );
};

export default SidebarMenuItem;
