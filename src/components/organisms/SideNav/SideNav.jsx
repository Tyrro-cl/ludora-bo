import { memo, useEffect, useMemo, useState } from 'react';
import Icon from '../../atoms/Icon/Icon';
import Counter from '../../atoms/Counter/Counter';
import './SideNav.css';

const DEFAULT_AVATAR = 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713';

const DEFAULT_USER = {
  name: 'M. Dupont',
  role: 'Enseignant',
  avatarUrl: DEFAULT_AVATAR,
};

const DEFAULT_NAV_GROUPS = [
  {
    id: 'home',
    label: 'Accueil',
    icon: 'Home',
    expanded: true,
    items: [
      { id: 'overview', label: "Vue d'ensemble", icon: 'Grid', selected: true },
    ],
  },
  {
    id: 'students',
    label: "Tableau d'élèves",
    icon: 'Database',
    counter: 203,
    counterVariant: 'success',
    expanded: true,
    items: [
      { id: 'notes', label: 'Toutes les notes', icon: 'BarChart3' },
    ],
  },
  {
    id: 'activities',
    label: 'Activités',
    icon: 'ListTodo',
    counter: 32,
    counterVariant: 'success',
    expanded: true,
    items: [
      { id: 'allActivities', label: 'Toutes les activités', icon: 'BookOpen' },
    ],
  },
];

const DEFAULT_HELP = {
  title: 'Besoin d\'aide?',
  description: "Consultez notre guide d'utilisation et nos ressources",
  ctaLabel: 'Voir le guide',
  icon: 'BookOpen',
};

function normalizeNavGroups(navGroups, navItems) {
  if (Array.isArray(navGroups) && navGroups.length) return navGroups;
  if (!Array.isArray(navItems) || !navItems.length) return DEFAULT_NAV_GROUPS;
  // Fallback: wrap flat nav items into groups so the component keeps working
  return navItems.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    counter: item.count,
    counterVariant: item.countVariant,
    expanded: true,
    items: item.children && item.children.length
      ? item.children
      : [
          {
            id: `${item.id}-link`,
            label: item.label,
            icon: item.icon,
            onClick: item.onClick,
            selected: item.selected,
            count: item.count,
            countVariant: item.countVariant,
          },
        ],
  }));
}

const SideNav = memo(function SideNav({
  state = 'expanded',
  user = DEFAULT_USER,
  navGroups: navGroupsProp,
  navItems, // kept for backward compatibility
  help = DEFAULT_HELP,
  onToggle,
  onHelpClick,
  className = '',
}) {
  const isExpanded = state === 'expanded';
  const nextState = isExpanded ? 'collapsed' : 'expanded';

  const navGroups = useMemo(() => normalizeNavGroups(navGroupsProp, navItems), [navGroupsProp, navItems]);

  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {};
    navGroups.forEach((group) => {
      initial[group.id] = group.expanded !== false;
    });
    return initial;
  });

  useEffect(() => {
    setExpandedGroups((prev) => {
      const updated = { ...prev };
      navGroups.forEach((group) => {
        if (updated[group.id] === undefined) {
          updated[group.id] = group.expanded !== false;
        }
      });
      return updated;
    });
  }, [navGroups]);

  const handleToggle = () => {
    if (onToggle) onToggle(nextState);
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const renderSubItem = (item) => {
    const isSelected = Boolean(item.selected);
    return (
      <button
        key={item.id}
        className={`side-nav-subitem ${isSelected ? 'is-selected' : ''}`}
        onClick={item.onClick}
        aria-label={item.label}
      >
        <Icon name={item.icon || 'Circle'} size={18} />
        <span className="side-nav-subitem-label">{item.label}</span>
      </button>
    );
  };

  const renderGroup = (group) => {
    const isGroupExpanded = Boolean(expandedGroups[group.id]);
    const hasChildren = Array.isArray(group.items) && group.items.length > 0;
    const isGroupActive = hasChildren
      ? group.items.some((item) => item.selected)
      : Boolean(group.selected);

    return (
      <div key={group.id} className="side-nav-group">
        <button
          className={`side-nav-group-trigger ${isGroupActive ? 'is-active' : ''}`}
          onClick={() => (hasChildren ? toggleGroup(group.id) : group.onClick?.())}
          aria-label={group.label}
        >
          <div className="side-nav-group-leading">
            <Icon name={group.icon || 'Circle'} size={20} />
            {isExpanded && <span className="side-nav-group-label">{group.label}</span>}
          </div>

          <div className="side-nav-group-meta">
            {group.counter !== undefined && (
              <Counter count={group.counter} variant={group.counterVariant || 'success'} />
            )}
            {isExpanded && hasChildren && (
              <Icon
                name={isGroupExpanded ? 'ChevronDown' : 'ChevronRight'}
                size={16}
                className="side-nav-group-chevron"
              />
            )}
          </div>
        </button>

        {isExpanded && hasChildren && isGroupExpanded && (
          <div className="side-nav-subitems" role="group" aria-label={group.label}>
            <div className="side-nav-rail" aria-hidden="true" />
            <div className="side-nav-sublist">{group.items.map(renderSubItem)}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`side-nav ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${className}`.trim()} aria-label="Navigation latérale">
      <div className="side-nav-header">
        <button className="side-nav-toggle" onClick={handleToggle} aria-label="Basculer le menu">
          <Icon name={isExpanded ? 'ChevronsLeft' : 'ChevronsRight'} size={18} />
        </button>
      </div>

      <div className="side-nav-user-block">
        <div className={`side-nav-user ${!isExpanded ? 'is-compact' : ''}`}>
          <div className="side-nav-avatar" aria-hidden="true">
            <img src={user.avatarUrl} alt={user.name} />
          </div>
          {isExpanded && (
            <div className="side-nav-user-meta">
              <p className="side-nav-user-name">{user.name}</p>
              <p className="side-nav-user-role">{user.role}</p>
            </div>
          )}
        </div>
      </div>

      <div className="side-nav-content" role="navigation" aria-label="Navigation principale">
        {navGroups.map(renderGroup)}
      </div>

      <div className="side-nav-help-card" role="group" aria-label="Aide">
        <div className="side-nav-help-head">
          <div className="side-nav-help-icon">
            <Icon name={help.icon} size={18} />
          </div>
          {isExpanded && (
            <div className="side-nav-help-text">
              <p className="side-nav-help-title">{help.title}</p>
              <p className="side-nav-help-description">{help.description}</p>
            </div>
          )}
        </div>
        {isExpanded && (
          <button className="side-nav-help-cta" onClick={onHelpClick}>
            {help.ctaLabel || 'Voir le guide'}
          </button>
        )}
        {!isExpanded && (
          <button className="side-nav-help-fab" onClick={onHelpClick} aria-label="Ouvrir l'aide">
            <Icon name="ChevronRight" size={16} />
          </button>
        )}
      </div>
    </aside>
  );
});

export default SideNav;
