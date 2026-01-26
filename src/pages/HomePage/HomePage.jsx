import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import CallToAction from '../../components/atoms/CallToAction/CallToAction';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import axiosInstance from '../../services/authService';
import './HomePage.css';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    classes: 0,
    students: 0,
    activities: 0,
    themes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [classesRes, activitiesRes, themesRes] = await Promise.all([
          axiosInstance.get('/classes'),
          axiosInstance.get('/activities'),
          axiosInstance.get('/themes')
        ]);

        // Ensure we have arrays and support paginated shapes
        const classes = Array.isArray(classesRes.data)
          ? classesRes.data
          : (Array.isArray(classesRes.data?.classes) ? classesRes.data.classes : []);
        const activities = Array.isArray(activitiesRes.data)
          ? activitiesRes.data
          : (Array.isArray(activitiesRes.data?.activities) ? activitiesRes.data.activities : []);
        const themes = Array.isArray(themesRes.data)
          ? themesRes.data
          : (Array.isArray(themesRes.data?.themes) ? themesRes.data.themes : []);

        // Calculate total students across all classes
        let totalStudents = 0;
        for (const cls of classes) {
          try {
            const studentsRes = await axiosInstance.get(`/classes/${cls.id}/students`);
            const students = Array.isArray(studentsRes.data) ? studentsRes.data : [];
            totalStudents += students.length;
          } catch (err) {
            console.warn(`Could not fetch students for class ${cls.id}:`, err);
          }
        }

        setStats({
          classes: classes.length,
          students: totalStudents,
          activities: activities.length,
          themes: themes.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default stats on error
        setStats({
          classes: 0,
          students: 0,
          activities: 0,
          themes: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'home', selected: true, onClick: () => navigate('/home/overview') },
    { id: 'students', label: "Tableau d'Éleves", icon: 'users', onClick: () => navigate('/notes') },
    { id: 'activities', label: 'Activités', icon: 'listTodo', onClick: () => navigate('/activities') },
    { id: 'messages', label: 'Mes messages', icon: 'messagesSquare', count: 0, countVariant: 'alert', onClick: () => navigate('/messages') },
    { id: 'admin', label: 'Administration', icon: 'settings', onClick: () => navigate('/administration') },
  ];

  if (loading) {
    return (
      <DashboardLayout user={user} onLogout={logout} navItems={navItems} selectedNavItem="home">
        <div className="home-loading">
          <p>Chargement...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={logout} navItems={navItems} selectedNavItem="home">
      <div className="home-page">
        <div className="home-subpage-header">
          <div>
            <p className="home-subtitle">Accueil</p>
            <h1 className="home-title">Vue d'ensemble</h1>
            <p className="home-description">Synthèse de vos classes, élèves et activités.</p>
          </div>
          <div className="home-subpage-actions">
            <Button variant="secondary" size="medium" onClick={() => navigate('/notes')}>
              Voir les élèves
            </Button>
            <Button variant="primary" size="medium" onClick={() => navigate('/activities')}>
              Créer une activité
            </Button>
          </div>
        </div>

        <div className="home-content">
          <section className="home-activity-section">
            <div className="home-activity-header">
              <h2 className="home-activity-title">Activités récentes</h2>
              <CallToAction variant="primary" onClick={() => navigate('/activities')}>
                Voir toutes les activités
              </CallToAction>
            </div>
            <p className="home-activity-subtitle">
              Gérez vos activités et suivez les progrès de vos élèves
            </p>
          </section>

          <div className="home-stats-grid">
            <button className="home-stat-card" onClick={() => navigate('/activities')}>
              <div className="home-stat-header">
                <div className="home-stat-icon home-stat-icon--purple">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C10.9 2 10 2.9 10 4V8H14V4C14 2.9 13.1 2 12 2ZM6 8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V10C22 8.9 21.1 8 20 8H18V4C18 1.8 16.2 0 14 0H10C7.8 0 6 1.8 6 4V8Z"/>
                  </svg>
                </div>
                <h3 className="home-stat-title">Classes</h3>
              </div>
              <p className="home-stat-value">{stats.classes}</p>
              <p className="home-stat-description">Classes actives</p>
            </button>
            
            <button className="home-stat-card" onClick={() => navigate('/activities')}>
              <div className="home-stat-header">
                <div className="home-stat-icon home-stat-icon--blue">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"/>
                  </svg>
                </div>
                <h3 className="home-stat-title">Élèves</h3>
              </div>
              <p className="home-stat-value">{stats.students}</p>
              <p className="home-stat-description">Élèves inscrits</p>
            </button>
            
            <button className="home-stat-card" onClick={() => navigate('/activities')}>
              <div className="home-stat-header">
                <div className="home-stat-icon home-stat-icon--green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17V11L12 16L2 11V17Z"/>
                  </svg>
                </div>
                <h3 className="home-stat-title">Activités</h3>
              </div>
              <p className="home-stat-value">{stats.activities}</p>
              <p className="home-stat-description">Activités disponibles</p>
            </button>
            
            <button className="home-stat-card" onClick={() => navigate('/activities')}>
              <div className="home-stat-header">
                <div className="home-stat-icon home-stat-icon--orange">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h3 className="home-stat-title">Thèmes</h3>
              </div>
              <p className="home-stat-value">{stats.themes}</p>
              <p className="home-stat-description">Thèmes pédagogiques</p>
            </button>
          </div>

          <section className="home-quick-actions">
            <h2 className="home-section-title">Actions rapides</h2>
            <div className="home-actions-grid">
              <button className="home-action-card" onClick={() => navigate('/activities')}>
                <div className="home-action-icon">📚</div>
                <h3>Gérer les activités</h3>
                <p>Consultez et organisez toutes vos activités pédagogiques</p>
              </button>
              <button className="home-action-card">
                <div className="home-action-icon">📝</div>
                <h3>Créer une classe</h3>
                <p>Ajoutez une nouvelle classe à votre école</p>
              </button>
              <button className="home-action-card">
                <div className="home-action-icon">👥</div>
                <h3>Inscrire des élèves</h3>
                <p>Ajoutez de nouveaux élèves à vos classes</p>
              </button>
              <button className="home-action-card">
                <div className="home-action-icon">📊</div>
                <h3>Voir les statistiques</h3>
                <p>Consultez les progrès de vos élèves</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
