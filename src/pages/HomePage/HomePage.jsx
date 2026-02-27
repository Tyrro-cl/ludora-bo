import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/atoms/Icon/Icon';
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
  const [now, setNow] = useState(new Date());

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

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(clockTimer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout user={user} onLogout={logout}>
        <div className="home-loading">
          <p>Chargement...</p>
        </div>
      </DashboardLayout>
    );
  }

  /* Quick actions order aligned with Figma design */
  const quickActions = [
    {
      id: 'alerts',
      title: 'Voir Urgences',
      subtitle: '6 élèves en risque',
      icon: 'circle-alert',
      tone: 'red',
      onClick: () => navigate('/notes')
    },
    {
      id: 'notes',
      title: 'Voir les Notes',
      subtitle: '45 notes à corriger',
      icon: 'book',
      tone: 'purple',
      onClick: () => navigate('/notes')
    },
    {
      id: 'publish',
      title: 'Publier Activité',
      subtitle: '28 brouillons',
      icon: 'send',
      tone: 'green',
      onClick: () => navigate('/activities')
    },
    {
      id: 'messages',
      title: 'Messages Parents',
      subtitle: '12 non lus',
      icon: 'message-square',
      tone: 'orange',
      onClick: () => navigate('/messages')
    },
    {
      id: 'attendance',
      title: 'Présences du Jour',
      subtitle: 'Majeure absences',
      icon: 'clipboard-list',
      tone: 'yellow',
      onClick: () => navigate('/notes')
    },
    {
      id: 'planning',
      title: 'Planning Semaine',
      subtitle: '4 activités prévues',
      icon: 'calendar-days',
      tone: 'neutral',
      onClick: () => navigate('/activities')
    }
  ];

  const aggregateMetrics = [
    { id: 'eleves', label: 'Élèves Total', value: stats.students },
    { id: 'note', label: 'Notes Total', value: '96.5 %' },
    { id: 'themes', label: 'Thèmes Total', value: stats.themes },
    { id: 'moyenne', label: 'Élèves Total', value: '14,3 / 20' }
  ];

  const detailMetrics = [
    { id: 'a', title: 'Total Élèves', value: stats.students, trend: '+1.2%', tone: 'positive' },
    { id: 'b', title: 'Total Élèves', value: 88, trend: '-4%', tone: 'warning' },
    { id: 'c', title: 'Total Élèves', value: 203, trend: '-1.5%', tone: 'danger' },
    { id: 'd', title: 'Total Élèves', value: 203, trend: '+2%', tone: 'positive' }
  ];

  const recentActivities = [
    { id: 1, title: 'Notes de Mathématiques publiées', meta: 'CM2A • Il y a 2h', icon: 'book-open', tone: 'yellow' },
    { id: 2, title: 'Message de Mme Martin (parent)', meta: 'Lucas Martin • Il y a 3h', icon: 'message-square', tone: 'purple' },
    { id: 3, title: 'Nouvelle activité “Dictée 15” créée', meta: 'CM1B • Il y a 5h', icon: 'notebook-pen', tone: 'green' },
    { id: 4, title: 'Élève en risque: Sophie Bernard', meta: 'CM1A • Il y a 1j', icon: 'triangle-alert', tone: 'red' }
  ];

  const deadlines = [
    { id: 1, title: 'Évaluation de Français', classes: 'CM1A, CM1B', date: '15 Jan 2026', level: 'Urgent' },
    { id: 2, title: 'Rencontre parents-professeurs', classes: 'Toutes classes', date: '18 Jan 2026', level: 'Moyen' },
    { id: 3, title: 'Correction des devoirs', classes: 'CM2A', date: '20 Jan 2026', level: 'Normal' }
  ];

  const todayLabel = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(now);

  const hourLabel = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(now);

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="home-page">
        <div className="home-toolbar">
          <p className="home-toolbar-breadcrumb">
            <span>Accueil</span>
            <span className="home-breadcrumb-separator">/</span>
            <span>Vue d&apos;ensemble</span>
          </p>

          <label className="home-toolbar-search" aria-label="Recherche globale">
            <Icon name="search" size={14} color="var(--color-text-on-dark-60)" />
            <input type="text" placeholder="Rechercher... (Addition, TP, Dictée)" />
          </label>
        </div>

        <section className="home-welcome-banner">
          <div>
            <h1>Bon retour, {user?.personalInfo?.firstName || 'M. Dupont'}!</h1>
            <p>Voici un aperçu de votre journée</p>
          </div>
          <div className="home-welcome-right">
            <span>{todayLabel}</span>
            <strong>{hourLabel}</strong>
          </div>
        </section>

        <section className="home-panel">
          <div className="home-panel-header">
            <div>
              <h2>Actions Rapides</h2>
              <p>Accédez direct à vos tâches urgentes</p>
            </div>
          </div>

          <div className="home-quick-actions-grid">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`home-quick-action-card home-quick-action-card--${action.tone}`}
                onClick={action.onClick}
              >
                <div className="home-quick-action-icon">
                  <Icon name={action.icon} size={14} color="var(--color-text-on-dark-100)" />
                </div>
                <h3>{action.title}</h3>
                <p>{action.subtitle}</p>
              </button>
            ))}
          </div>

          <div className="home-aggregate-metrics">
            {aggregateMetrics.map((metric) => (
              <div key={metric.id} className="home-aggregate-item">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-detail-metrics-grid">
          {detailMetrics.map((metric) => (
            <article key={metric.id} className="home-detail-card">
              <div className="home-detail-top">
                <span>{metric.title}</span>
                <span className={`home-trend home-trend--${metric.tone}`}>{metric.trend}</span>
              </div>
              <div className="home-detail-bottom">
                <strong>{metric.value}</strong>
              </div>
            </article>
          ))}
        </section>

        <section className="home-bottom-grid">
          <article className="home-panel home-panel--activities">
            <div className="home-panel-title-row">
              <h2>Activité Récente</h2>
            </div>

            <div className="home-recent-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="home-recent-item">
                  <span className={`home-recent-item-icon home-recent-item-icon--${activity.tone}`}>
                    <Icon name={activity.icon} size={12} color="var(--color-text-on-dark-100)" />
                  </span>
                  <div>
                    <p>{activity.title}</p>
                    <small>{activity.meta}</small>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="home-panel home-panel--deadlines">
            <div className="home-panel-title-row">
              <h2>Échéances</h2>
            </div>

            <div className="home-deadlines-list">
              {deadlines.map((deadline) => (
                <article key={deadline.id} className="home-deadline-card">
                  <p className="home-deadline-title">{deadline.title}</p>
                  <p className="home-deadline-classes">{deadline.classes}</p>
                  <div className="home-deadline-footer">
                    <span>{deadline.date}</span>
                    <span className={`home-priority home-priority--${deadline.level.toLowerCase()}`}>
                      {deadline.level}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
