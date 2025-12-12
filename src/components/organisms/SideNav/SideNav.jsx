import { memo } from 'react';
import Icon from '../../atoms/Icon/Icon';
import Counter from '../../atoms/Counter/Counter';
import './SideNav.css';

const DEFAULT_AVATAR = 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713';

const DEFAULT_USER = {
  name: 'M. Dupont',
  role: 'Enseignant',
  avatarUrl: DEFAULT_AVATAR,
};

const DEFAULT_NAV_ITEMS = [
  { id: 'students', label: "Tableau d'Éleves", icon: 'users', selected: false },
  { id: 'messages', label: 'Mes messages', icon: 'messagesSquare', count: 0, countVariant: 'alert' },
  { id: 'admin', label: 'Administration', icon: 'settings', selected: false },
];

const DEFAULT_ACTIVITY_ITEMS = [
  { id: 'published', label: 'Publiées', count: 0 },
  { id: 'drafts', label: 'Brouillons', count: 0 },
  { id: 'scheduled', label: 'Programmées', count: 0 },
];

const DEFAULT_STATS = [
  { id: 'todayActivities', title: 'Activités du jour', value: 16, trend: '+11%', trendTone: 'positive', icon: 'taskSquare' },
  { id: 'userOfDay', title: 'Utilisateur du jour', value: 56, trend: '-2%', trendTone: 'negative', icon: 'taskSquare' },
  { id: 'parentMessages', title: 'Messages parent', value: 205, trend: '-11%', trendTone: 'warning', icon: 'taskSquare' },
  { id: 'studentAlerts', title: 'Alertes étudiantes', value: 10, trend: '-8%', trendTone: 'warning', icon: 'taskSquare' },
];

const DEFAULT_HELP = {
  title: "Besoin d'aide?",
  description: "Consultez notre guide d'utilisation",
  ctaLabel: 'Consulter le guide',
  icon: 'messageCircleQuestion',
};

const SideNav = memo(function SideNav({
  state = 'expanded',
  user = DEFAULT_USER,
  navItems = DEFAULT_NAV_ITEMS,
  activityItems = DEFAULT_ACTIVITY_ITEMS,
  stats = DEFAULT_STATS,
  help = DEFAULT_HELP,
  onToggle,
  onHelpClick,
  className = '',
}) {
  const isExpanded = state === 'expanded';
  const nextState = isExpanded ? 'collapsed' : 'expanded';

  const handleToggle = () => {
    if (onToggle) onToggle(nextState);
  };

  const renderNavItem = (item) => {
    const isSelected = Boolean(item.selected);
    const countVariant = item.countVariant || 'default';
    return (
      <button
        key={item.id}
        className={`side-nav-item ${isSelected ? 'is-selected' : ''}`}
        onClick={item.onClick}
        aria-label={item.label}
      >
        <span className="side-nav-item-leading">
          <Icon name={item.icon} size={20} />
        </span>
        {isExpanded && <span className="side-nav-item-label">{item.label}</span>}
        {item.count !== undefined && (
          <Counter
            count={item.count}
            variant={countVariant}
            className={isExpanded ? '' : 'side-nav-item-counter-collapsed'}
          />
        )}
      </button>
    );
  };

  const renderActivityItem = (item) => (
    <div key={item.id} className="side-nav-activity-item">
      <span className="side-nav-activity-label">{item.label}</span>
      <Counter count={item.count} />
    </div>
  );

  const renderStat = (stat) => (
    <div key={stat.id} className="side-nav-stat-card">
      <div className="side-nav-stat-icon">
        <Icon name={stat.icon} size={20} />
      </div>
      <div className="side-nav-stat-content">
        <p className="side-nav-stat-title">{stat.title}</p>
        <div className="side-nav-stat-values">
          <span className="side-nav-stat-value">{stat.value}</span>
          <span className={`side-nav-stat-trend trend-${stat.trendTone || 'neutral'}`}>
            {stat.trend}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <aside className={`side-nav ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${className}`.trim()} aria-label="Navigation latérale">
      <div className="side-nav-header">
        <button className="side-nav-toggle" onClick={handleToggle} aria-label="Basculer le menu">
          <Icon name={isExpanded ? 'chevronLeft' : 'chevronRight'} size={18} />
        </button>
      </div>

      <div className="side-nav-section">
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

      <div className="side-nav-separator" />

      <nav className="side-nav-section" aria-label="Navigation principale">
        <div className="side-nav-list">{navItems.map(renderNavItem)}</div>
      </nav>

      <div className="side-nav-separator" />

      <div className="side-nav-section">
        <div className="side-nav-activities">
          <div className="side-nav-activities-header">
            <div className="side-nav-activities-title">
              <Icon name="activities" size={20} />
              {isExpanded && <span>Activités</span>}
            </div>
            {isExpanded && (
              <button className="side-nav-activities-add" aria-label="Ajouter">
                <Icon name="plus" size={18} />
              </button>
            )}
          </div>
          {isExpanded ? (
            <div className="side-nav-activities-list">{activityItems.map(renderActivityItem)}</div>
          ) : (
            <div className="side-nav-activities-collapsed">{activityItems.map((item) => renderNavItem({ ...item, icon: 'listTodo' }))}</div>
          )}
        </div>
      </div>

      {isExpanded && <div className="side-nav-separator" />}

      {isExpanded ? (
        <div className="side-nav-section side-nav-help" role="group" aria-label="Aide">
          <div className="side-nav-help-icon">
            <Icon name={help.icon} size={20} />
          </div>
          <div className="side-nav-help-content">
            <p className="side-nav-help-title">{help.title}</p>
            <p className="side-nav-help-description">{help.description}</p>
          </div>
          <button className="side-nav-help-cta" onClick={onHelpClick}>
            {help.ctaLabel}
          </button>
        </div>
      ) : (
        <button className="side-nav-help-fab" onClick={onHelpClick} aria-label="Aide">
          <Icon name={help.icon} size={18} />
        </button>
      )}

      {isExpanded && (
        <div className="side-nav-section side-nav-stats" aria-label="Statistiques">
          {stats.map(renderStat)}
        </div>
      )}
    </aside>
  );
});

export default SideNav;
