import { useState } from 'react';
import SideNav from '../SideNav/SideNav';
import TopNav from '../TopNav/TopNav';
import './DashboardLayout.css';

const DashboardLayout = ({ children, user, onLogout, navGroups: customNavGroups, navItems: customNavItems }) => {
  const [sideNavExpanded, setSideNavExpanded] = useState(true);
  const [notifications, setNotifications] = useState(null);

  const handleSideNavToggle = (newState) => {
    setSideNavExpanded(newState === 'expanded');
  };

  const handleNotifications = () => {
    setNotifications(notifications ? null : 'open');
  };

  const help = {
    title: "Besoin d'aide?",
    description: "Consultez notre guide d'utilisation et nos ressources",
    ctaLabel: 'Voir le guide',
    icon: 'MessageCircleQuestion',
  };

  const sideNavUser = user ? {
    name: user.personalInfo?.firstName 
      ? String(user.personalInfo.firstName) 
      : user.email 
        ? String(user.email).split('@')[0]
        : 'Utilisateur',
    role: user.role?.name 
      ? String(user.role.name)
      : 'Enseignant',
    avatarUrl: user.personalInfo?.image || 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713'
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
            navGroups={customNavGroups}
            navItems={customNavItems}
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
