import { useState } from 'react';
import Icon from '../../atoms/Icon/Icon';
import Button from '../../atoms/Button/Button';
import './TopNav.css';

const TopNav = ({ user, onLogout, onNotifications }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    if (onLogout) onLogout();
  };

  const handleNotifications = () => {
    if (onNotifications) onNotifications();
  };

  return (
    <header className="top-nav">
      <div className="top-nav-content">
        <div className="top-nav-left">
          <h1 className="top-nav-title">Tableau de bord</h1>
        </div>

        <div className="top-nav-right">
          <button
            className="top-nav-icon-button"
            onClick={handleNotifications}
            aria-label="Notifications"
          >
            <Icon name="bell" size={20} />
            <span className="top-nav-notification-badge">3</span>
          </button>

          <div className="top-nav-divider" />

          <div className="top-nav-user-section">
            <button
              className="top-nav-user-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
            >
              <span className="top-nav-user-name">
                {user?.personalInfo?.firstName || user?.email?.split('@')[0] || 'Utilisateur'}
              </span>
              <Icon name={isUserMenuOpen ? 'chevronUp' : 'chevronDown'} size={16} />
            </button>

            {isUserMenuOpen && (
              <div className="top-nav-user-menu">
                <button className="top-nav-menu-item">
                  <Icon name="user" size={16} />
                  <span>Profil</span>
                </button>
                <button className="top-nav-menu-item">
                  <Icon name="settings" size={16} />
                  <span>Paramètres</span>
                </button>
                <div className="top-nav-menu-divider" />
                <button className="top-nav-menu-item top-nav-menu-item--danger" onClick={handleLogout}>
                  <Icon name="logOut" size={16} />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
