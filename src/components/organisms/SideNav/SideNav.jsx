import { memo, useEffect, useMemo, useState } from 'react';
import Icon from '../../atoms/Icon/Icon';
import StatusRoot from '../../atoms/StatusRoot/StatusRoot';
import NavLineIndicator from '../../atoms/NavLineIndicator/NavLineIndicator';
import NavButtonRoot from '../../molecules/NavButtonRoot/NavButtonRoot';
import './SideNav.css';

const DEFAULT_AVATAR = 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713';

const DEFAULT_USER = {
  name: 'M. Dupont',
  role: 'Enseignant',
  avatarUrl: DEFAULT_AVATAR,
};

export const DEFAULT_NAV_GROUPS = [
  {
    id: 'home',
    label: 'Accueil',
    icon: 'Home',
    selected: true,
    expanded: true,
    items: [
      { id: 'overview', label: "Vue d'ensemble", icon: 'LayoutGrid', selected: true },
      { id: 'previewStudents', label: 'Aperçu élèves', icon: 'Users' },
      { id: 'previewActivities', label: 'Aperçu activités', icon: 'Zap' },
      { id: 'previewMessages', label: 'Aperçu messages', icon: 'MessageSquare', counter: 999, counterVariant: 'alert' },
      { id: 'previewAdmin', label: 'Aperçu admin', icon: 'ShieldCheck' },
    ],
  },
  {
    id: 'students',
    label: "Tableau d'élèves",
    icon: 'Database',
    counter: 203,
    counterVariant: 'alert',
    expanded: true,
    items: [
      { id: 'allNotes', label: 'Toutes les notes', icon: 'BarChart3' },
      { id: 'calculated', label: 'Calculées', icon: 'Calculator' },
      { id: 'todo', label: 'A faire', icon: 'ListChecks', counter: 103, counterVariant: 'default' },
      { id: 'pending', label: 'En attente', icon: 'Clock', counter: 100, counterVariant: 'default' },
    ],
  },
  {
    id: 'activities',
    label: 'Activités',
    icon: 'ListTodo',
    counter: 32,
    counterVariant: 'alert',
    expanded: true,
    items: [
      { id: 'allActivities', label: 'Toutes les activités', icon: 'BookOpen' },
      { id: 'published', label: 'Publiées', icon: 'Send', counter: 16, counterVariant: 'success' },
      { id: 'drafts', label: 'Brouillons', icon: 'PenSquare', counter: 12, counterVariant: 'default' },
      { id: 'scheduled', label: 'Programmation', icon: 'Calendar', counter: 4, counterVariant: 'warning' },
      { id: 'createActivity', label: 'Créer une activité', icon: 'PlusCircle', isAction: true },
      { id: 'templates', label: 'Templates', icon: 'Copy' },
    ],
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: 'MessageSquare',
    counter: 88,
    counterVariant: 'alert',
    expanded: true,
    items: [
      { id: 'inbox', label: 'Boîte de réception', icon: 'Inbox', counter: 24, counterVariant: 'success' },
      { id: 'sent', label: 'Envoyés', icon: 'Send' },
      { id: 'parentMessages', label: 'Messages parents', icon: 'MessageCircle', counter: 12, counterVariant: 'default' },
      { id: 'archived', label: 'Archivés', icon: 'Archive' },
    ],
  },
  {
    id: 'businessPlan',
    label: 'Business Plan',
    icon: 'FileText',
    expanded: true,
    items: [
      { id: 'bpOverview', label: 'Vue d\'ensemble', icon: 'LayoutGrid' },
      { id: 'bpFinancement', label: 'Plan de financement', icon: 'Landmark' },
      { id: 'bpResultat', label: 'Compte de résultat', icon: 'Receipt' },
      { id: 'bpTresorerie', label: 'Trésorerie', icon: 'Wallet' },
      { id: 'bpPilotage', label: 'Pilotage & KPIs', icon: 'Gauge' },
    ],
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'Settings',
    counter: 203,
    counterVariant: 'alert',
    expanded: true,
    items: [
      { id: 'users', label: 'Utilisateurs', icon: 'Users' },
      { id: 'classesGroups', label: 'Classes & groupes', icon: 'FolderOpen' },
      { id: 'generalSettings', label: 'Paramètres géneraux', icon: 'Settings' },
      { id: 'permissions', label: 'Permissions', icon: 'Lock' },
    ],
  },
];

const DEFAULT_HELP = {
  title: 'Besoin d\'aide?',
  description: "Consultez notre guide d'utilisation et nos ressources",
  ctaLabel: 'Voir le guide',
  icon: 'MessageCircleQuestion',
};

function normalizeNavGroups(navGroups, navItems) {
  if (Array.isArray(navGroups) && navGroups.length) return navGroups;
  if (!Array.isArray(navItems) || !navItems.length) return DEFAULT_NAV_GROUPS;
  return navItems.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    counter: item.count,
    counterVariant: item.countVariant,
    expanded: true,
    selected: item.selected,
    onClick: item.onClick,
    items: item.children || [],
  }));
}

/* Color styles from Figma — use CSS variables for design-token consistency */
const BADGE_COLORS = {
  alert: {
    icon: 'var(--color-utility-decrease)',
    text: 'var(--color-utility-decrease)',
    bg: 'var(--color-badge-risk-bg)',
    border: 'var(--color-badge-risk-stroke)',
  },
  success: {
    icon: 'var(--color-utility-increase)',
    text: 'var(--color-utility-increase)',
    bg: 'var(--color-badge-on-track-bg)',
    border: 'var(--color-badge-on-track-stroke)',
  },
  warning: {
    icon: 'var(--color-utility-caution)',
    text: 'var(--color-utility-caution)',
    bg: 'var(--color-badge-support-bg)',
    border: 'var(--color-badge-support-stroke)',
  },
  default: {
    icon: 'var(--color-utility-stuck)',
    text: 'var(--color-utility-stuck)',
    bg: 'var(--color-badge-pending-bg)',
    border: 'var(--color-badge-pending-stroke)',
  },
};

const SideNav = memo(function SideNav({
  state = 'expanded',
  user = DEFAULT_USER,
  navGroups: navGroupsProp,
  navItems,
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

  const renderBadge = (count, variant = 'default', compact = false) => {
    if (count === undefined || count === null) return null;
    const effectiveVariant = compact ? 'default' : variant;
    const colors = BADGE_COLORS[effectiveVariant] || BADGE_COLORS.default;
    const displayCount = count > 999 ? '999' : String(count);
    return (
      <StatusRoot
        content={displayCount}
        icon={false}
        variant="Primary"
        compact
        className="side-nav-badge"
        style={{
          '--status-icon-color': colors.icon,
          '--status-text-color': colors.text,
          '--status-bg-color': colors.bg,
          '--status-border-color': colors.border,
        }}
      />
    );
  };

  const renderGroup = (group) => {
    const isGroupExpanded = Boolean(expandedGroups[group.id]);
    const hasChildren = Array.isArray(group.items) && group.items.length > 0;
    const isGroupActive = hasChildren
      ? group.items.some((item) => item.selected)
      : Boolean(group.selected);

    const segments = hasChildren
      ? group.items.map((item) => Boolean(item.selected))
      : [];

    return (
      <div key={group.id} className="side-nav-segment">
        <div className="side-nav-nav-button">
          <button
            className={`side-nav-btn-root ${isGroupActive ? 'is-active' : ''}`}
            onClick={() => (hasChildren ? toggleGroup(group.id) : group.onClick?.())}
            aria-label={group.label}
            aria-expanded={hasChildren ? isGroupExpanded : undefined}
          >
            <div className="side-nav-btn-content">
              <div className="side-nav-btn-leading">
                <div className="side-nav-btn-icon-group">
                  {!isExpanded && renderBadge(group.counter, group.counterVariant, true)}
                  <Icon name={group.icon || 'Circle'} size={24} />
                </div>
                {isExpanded && <span className="side-nav-btn-label">{group.label}</span>}
              </div>
              {isExpanded && (
                <div className="side-nav-btn-trailing">
                  {renderBadge(group.counter, group.counterVariant)}
                  {hasChildren && (
                    <Icon
                      name={isGroupExpanded ? 'ChevronDown' : 'ChevronRight'}
                      size={16}
                      className="side-nav-btn-chevron"
                    />
                  )}
                </div>
              )}
              {!isExpanded && hasChildren && (
                <Icon
                  name={isGroupExpanded ? 'ChevronDown' : 'ChevronRight'}
                  size={14}
                  className="side-nav-btn-chevron"
                />
              )}
            </div>
            <div className="side-nav-btn-bg" aria-hidden="true" />
          </button>
        </div>

        {isExpanded && hasChildren && isGroupExpanded && (
          <div className="side-nav-items-container" role="group" aria-label={group.label}>
            <NavLineIndicator
              segments={segments}
              height={group.items.length * 40}
              className="side-nav-line-indicator"
            />
            <div className="side-nav-sublist">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`side-nav-child-row ${item.selected ? 'is-selected' : ''} ${item.isAction ? 'is-action' : ''}`}
                >
                  <NavButtonRoot
                    itemLabel={item.label}
                    leftIconName={item.icon || 'Circle'}
                    iconStart={true}
                    iconEnd={false}
                    itemText={true}
                    state="Expanded"
                    className="side-nav-child-btn"
                    onClick={item.onClick}
                  />
                  {item.counter !== undefined && renderBadge(item.counter, item.counterVariant)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`side-nav ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${className}`.trim()} aria-label="Navigation latérale">
      <div className="side-nav-top">
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

        <div className="side-nav-separator" aria-hidden="true" />
      </div>

      <div className="side-nav-help-wrapper">
        <div className="side-nav-help-card" role="group" aria-label="Aide">
          {isExpanded && (
            <>
              <div className="side-nav-help-head">
                <div className="side-nav-help-icon">
                  <Icon name={help.icon} size={18} />
                </div>
              </div>
              <div className="side-nav-help-text">
                <p className="side-nav-help-title">{help.title}</p>
                <p className="side-nav-help-description">{help.description}</p>
              </div>
              <button className="side-nav-help-cta" onClick={onHelpClick}>
                {help.ctaLabel || 'Voir le guide'}
              </button>
            </>
          )}
          {!isExpanded && (
            <div className="side-nav-help-collapsed">
              <Icon name={help.icon || 'MessageCircleQuestion'} size={20} />
            </div>
          )}
          <div className="side-nav-help-bg" aria-hidden="true" />
        </div>
      </div>
    </aside>
  );
});

export default SideNav;
