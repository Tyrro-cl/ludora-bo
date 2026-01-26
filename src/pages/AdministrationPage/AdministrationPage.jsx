import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button/Button';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import axiosInstance from '../../services/authService';
import './AdministrationPage.css';

const AdministrationPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    schoolName: 'Ludora School',
    maxStudentsPerClass: 30,
    academicYear: '2025-2026',
    notificationsEnabled: true,
    autoBackup: true,
  });
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Placeholder for API call - replace with actual endpoint
      const response = await axiosInstance.get('/settings');
      setSettings(response.data || settings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axiosInstance.post('/settings', settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'home', onClick: () => navigate('/home/overview') },
    { id: 'students', label: "Tableau d'Éleves", icon: 'users', onClick: () => navigate('/notes') },
    { id: 'activities', label: 'Activités', icon: 'listTodo', onClick: () => navigate('/activities') },
    { id: 'messages', label: 'Mes messages', icon: 'messagesSquare', count: 0, countVariant: 'alert', onClick: () => navigate('/messages') },
    { id: 'admin', label: 'Administration', icon: 'settings', selected: true, onClick: () => {} },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={handleLogout}
      navItems={navItems}
      selectedNavItem="admin"
    >
      <div className="administration-page">
        <div className="admin-header">
          <h1>Administration</h1>
          <p className="admin-subtitle">Gérez les paramètres de l'établissement</p>
        </div>

        {loading ? (
          <div className="admin-loading">
            <p>Chargement des paramètres...</p>
          </div>
        ) : (
          <div className="admin-content">
            <div className="admin-tabs">
              <button 
                className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                Paramètres généraux
              </button>
              <button 
                className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Utilisateurs
              </button>
              <button 
                className={`tab-button ${activeTab === 'backup' ? 'active' : ''}`}
                onClick={() => setActiveTab('backup')}
              >
                Sauvegarde
              </button>
            </div>

            {activeTab === 'general' && (
              <div className="admin-section">
                <h2>Paramètres généraux</h2>
                
                <div className="form-group">
                  <label htmlFor="schoolName">Nom de l'établissement</label>
                  <input
                    id="schoolName"
                    type="text"
                    value={settings.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="academicYear">Année académique</label>
                  <input
                    id="academicYear"
                    type="text"
                    value={settings.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="maxStudents">Nombre maximum d'élèves par classe</label>
                  <input
                    id="maxStudents"
                    type="number"
                    value={settings.maxStudentsPerClass}
                    onChange={(e) => handleInputChange('maxStudentsPerClass', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="form-group checkbox">
                  <input
                    id="notifications"
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => handleInputChange('notificationsEnabled', e.target.checked)}
                  />
                  <label htmlFor="notifications">Activer les notifications</label>
                </div>

                <div className="form-actions">
                  <Button 
                    variant="primary" 
                    size="medium"
                    onClick={handleSaveSettings}
                  >
                    Enregistrer les modifications
                  </Button>
                  {saveSuccess && (
                    <p className="success-message">Paramètres enregistrés avec succès</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="admin-section">
                <h2>Gestion des utilisateurs</h2>
                <div className="info-box">
                  <p>La gestion des utilisateurs sera disponible bientôt.</p>
                  <p>Vous pouvez créer, modifier ou supprimer des comptes d'utilisateurs depuis cette interface.</p>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="admin-section">
                <h2>Sauvegarde et restauration</h2>
                <div className="form-group checkbox">
                  <input
                    id="autoBackup"
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                  />
                  <label htmlFor="autoBackup">Sauvegarde automatique quotidienne</label>
                </div>
                <div className="backup-actions">
                  <Button variant="secondary" size="medium">
                    Sauvegarder maintenant
                  </Button>
                  <Button variant="secondary" size="medium">
                    Restaurer à partir d'une sauvegarde
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdministrationPage;
