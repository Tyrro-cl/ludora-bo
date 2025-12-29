import { useState } from 'react';
import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';
import './DashboardLayout.css';

const DashboardLayout = ({ children, user, onLogout }) => {
  const [sideNavExpanded, setSideNavExpanded] = useState(true);
  const [notifications, setNotifications] = useState(null);

  const handleSideNavToggle = (newState) => {
    setSideNavExpanded(newState === 'expanded');
  };

  const handleNotifications = () => {
    setNotifications(notifications ? null : 'open');
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: 'home',
      selected: false,
      onClick: () => window.location.href = '/home'
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: 'users',
      selected: false,
      onClick: () => window.location.href = '/classes'
    },
    {
      id: 'activities',
      label: 'Activités',
      icon: 'listTodo',
      selected: false,
      onClick: () => window.location.href = '/activities'
    },
    {
      id: 'students',
      label: 'Élèves',
      icon: 'user',
      selected: false,
      onClick: () => window.location.href = '/students'
    },
  ];

  const activityItems = [
    { id: 'published', label: 'Publiées', count: 12 },
    { id: 'drafts', label: 'Brouillons', count: 3 },
    { id: 'scheduled', label: 'Programmées', count: 5 },
  ];

  const stats = [
    {
      id: 'todayActivities',
      title: 'Activités du jour',
      value: 16,
      trend: '+11%',
      trendTone: 'positive',
      icon: 'taskSquare'
    },
    {
      id: 'userOfDay',
      title: 'Utilisateur du jour',
      value: 56,
      trend: '-2%',
      trendTone: 'negative',
      icon: 'taskSquare'
    },
    {
      id: 'parentMessages',
      title: 'Messages parent',
      value: 205,
      trend: '-11%',
      trendTone: 'warning',
      icon: 'taskSquare'
    },
    {
      id: 'studentAlerts',
      title: 'Alertes étudiantes',
      value: 10,
      trend: '-8%',
      trendTone: 'warning',
      icon: 'taskSquare'
    },
  ];

  const help = {
    title: "Besoin d'aide?",
    description: "Consultez notre guide d'utilisation",
    ctaLabel: 'Consulter le guide',
    icon: 'messageCircleQuestion',
  };

  // Transform user object to match SideNav expectations
  const sideNavUser = user ? {
    name: user.name || user.email || 'Utilisateur',
    role: user.role || 'Enseignant',
    avatarUrl: user.avatarUrl || 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713'
  } : {
    name: 'Utilisateur',
    role: 'Enseignant',
    avatarUrl: 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713'
  };

  return (
    <div className="dashboard-layout">
      <TopNav
        user={user}
        onLogout={onLogout}
        onNotifications={handleNotifications}
      />

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <SideNav
            state={sideNavExpanded ? 'expanded' : 'collapsed'}
            user={sideNavUser}
            navItems={navItems}
            activityItems={activityItems}
            stats={stats}
            help={help}
            onToggle={handleSideNavToggle}
            onHelpClick={() => console.log('Help clicked')}
          />
        </aside>

        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
