import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button/Button';
import Icon from '../../components/atoms/Icon/Icon';
import StudentStatus from '../../components/atoms/StudentStatus/StudentStatus';
import ScoreBadge from '../../components/molecules/ScoreBadge/ScoreBadge';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import axiosInstance from '../../services/authService';
import './ActivityDetailPage.css';

const ActivityDetailPage = () => {
  const { activityId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchActivityData();
  }, [activityId]);

  const fetchActivityData = async () => {
    try {
      // Fetch activity info
      const activityRes = await axiosInstance.get(`/activities/${activityId}`);
      setActivity(activityRes.data);

      // Fetch student submissions
      const submissionsRes = await axiosInstance.get(`/activities/${activityId}/submissions`);
      setSubmissions(Array.isArray(submissionsRes.data) ? submissionsRes.data : []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      // Mock data for development
      setActivity({
        id: activityId,
        name: 'Fractions et Décimales',
        theme: 'Nombres et calculs',
        description: 'Apprenez à manipuler les fractions et les convertir en décimales. Cette activité couvre les concepts fondamentaux avec des exercices pratiques.',
        status: 'En cours',
        createdDate: '2026-01-15',
        dueDate: '2026-02-20',
        totalStudents: 28,
        completedCount: 12,
        averageScore: 14.2,
        difficulty: 'Moyen',
      });

      setSubmissions([
        {
          id: 1,
          studentName: 'Emma Martin',
          studentId: '1',
          status: 'Terminé',
          score: 16,
          submittedDate: '2026-01-20',
          timeSpent: '45 min',
          attempts: 2,
        },
        {
          id: 2,
          studentName: 'Lucas Dubois',
          studentId: '2',
          status: 'Terminé',
          score: 12,
          submittedDate: '2026-01-19',
          timeSpent: '38 min',
          attempts: 3,
        },
        {
          id: 3,
          studentName: 'Sophie Bernard',
          studentId: '3',
          status: 'En cours',
          score: null,
          submittedDate: null,
          timeSpent: '15 min',
          attempts: 1,
        },
        {
          id: 4,
          studentName: 'Thomas Lefevre',
          studentId: '4',
          status: 'Non commencé',
          score: null,
          submittedDate: null,
          timeSpent: '0 min',
          attempts: 0,
        },
        {
          id: 5,
          studentName: 'Manon Rousseau',
          studentId: '5',
          status: 'Terminé',
          score: 17,
          submittedDate: '2026-01-21',
          timeSpent: '52 min',
          attempts: 1,
        },
        {
          id: 6,
          studentName: 'Hugo Petit',
          studentId: '6',
          status: 'Terminé',
          score: 14,
          submittedDate: '2026-01-18',
          timeSpent: '41 min',
          attempts: 2,
        },
      ]);

      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'home', onClick: () => navigate('/home/overview') },
    { id: 'students', label: "Tableau d'Éleves", icon: 'users', onClick: () => navigate('/notes') },
    { id: 'activities', label: 'Activités', icon: 'listTodo', selected: true, onClick: () => navigate('/activities') },
    { id: 'messages', label: 'Mes messages', icon: 'messagesSquare', count: 0, countVariant: 'alert', onClick: () => navigate('/messages') },
    { id: 'admin', label: 'Administration', icon: 'settings', onClick: () => navigate('/administration') },
  ];

  const getScoreColor = (score) => {
    if (score >= 16) return 'success';
    if (score >= 12) return 'warning';
    return 'danger';
  };

  const getStatusVariant = (status) => {
    const statusMap = {
      'Terminé': 'success',
      'En cours': 'warning',
      'Non commencé': 'info',
    };
    return statusMap[status] || 'default';
  };

  if (loading) {
    return (
      <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="activities">
        <div className="activity-detail-loading">
          <p>Chargement de l'activité...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!activity) {
    return (
      <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="activities">
        <div className="activity-detail-error">
          <p>Activité non trouvée</p>
          <Button variant="primary" onClick={() => navigate('/activities')}>
            Retour aux activités
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const completionRate = activity.totalStudents > 0 
    ? Math.round((activity.completedCount / activity.totalStudents) * 100) 
    : 0;

  return (
    <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="activities">
      <div className="activity-detail-page">
        {/* Breadcrumb */}
        <div className="activity-detail-breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('/activities')}>
            Activités
          </button>
          <Icon name="chevronRight" size={16} />
          <span className="breadcrumb-current">{activity.name}</span>
        </div>

        {/* Header */}
        <div className="activity-detail-header">
          <div className="activity-header-main">
            <div className="activity-header-icon">
              <Icon name="listTodo" size={32} />
            </div>
            <div className="activity-header-info">
              <h1>{activity.name}</h1>
              <p className="activity-theme">{activity.theme}</p>
              <p className="activity-description">{activity.description}</p>
            </div>
          </div>
          <div className="activity-header-actions">
            <Button variant="secondary" size="medium">
              <Icon name="edit" size={18} />
              Éditer
            </Button>
            <Button variant="primary" size="medium">
              <Icon name="share2" size={18} />
              Partager
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="activity-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="users" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Élèves</p>
              <p className="stat-value">{activity.completedCount}/{activity.totalStudents}</p>
              <p className="stat-sublabel">Complétée</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="percentCircle" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Taux de complétion</p>
              <p className="stat-value">{completionRate}%</p>
              <div className="stat-progress-bar">
                <div className="stat-progress-fill" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="trophy" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Moyenne générale</p>
              <p className="stat-value">{activity.averageScore}/20</p>
              <p className="stat-sublabel">Score moyen</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="zap" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Difficulté</p>
              <p className="stat-value">{activity.difficulty}</p>
              <p className="stat-sublabel">Niveau de difficulté</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="activity-details-section">
          <div className="details-grid">
            <div className="detail-item">
              <label>Date de création</label>
              <p>{new Date(activity.createdDate).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="detail-item">
              <label>Date limite</label>
              <p>{new Date(activity.dueDate).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="detail-item">
              <label>Statut</label>
              <span className={`status-badge status-${activity.status.toLowerCase().replace(/ /g, '-')}`}>
                {activity.status}
              </span>
            </div>
            <div className="detail-item">
              <label>Catégorie</label>
              <p>{activity.theme}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="activity-detail-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Aperçu
          </button>
          <button
            className={`tab-button ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Soumissions ({submissions.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytiques
          </button>
        </div>

        {/* Tab Content */}
        <div className="activity-detail-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <h2>À propos de cette activité</h2>
              <p>{activity.description}</p>

              <h3>Informations clés</h3>
              <ul className="info-list">
                <li>
                  <strong>Objectifs pédagogiques:</strong> Comprendre les fractions et les convertir en décimales
                </li>
                <li>
                  <strong>Durée estimée:</strong> 45-60 minutes
                </li>
                <li>
                  <strong>Ressources incluses:</strong> Cours vidéo, exercices interactifs, quiz
                </li>
                <li>
                  <strong>Évaluation:</strong> Automatique via questionnaire
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="submissions-content">
              <h2>Soumissions des élèves</h2>
              {submissions.length === 0 ? (
                <p className="empty-state">Aucune soumission pour le moment</p>
              ) : (
                <div className="submissions-table">
                  <div className="submissions-table-header">
                    <div>Élève</div>
                    <div>Statut</div>
                    <div>Score</div>
                    <div>Temps</div>
                    <div>Tentatives</div>
                    <div>Date de soumission</div>
                  </div>
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="submissions-table-row"
                      onClick={() => navigate(`/students/${submission.studentId}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="submission-name">
                        <Icon name="user" size={16} />
                        {submission.studentName}
                      </div>
                      <div>
                        <span className={`status-badge status-${submission.status.toLowerCase().replace(/ /g, '-')}`}>
                          {submission.status}
                        </span>
                      </div>
                      <div>
                        {submission.score ? (
                          <ScoreBadge score={submission.score} variant={getScoreColor(submission.score)} />
                        ) : (
                          <span className="no-score">-</span>
                        )}
                      </div>
                      <div>{submission.timeSpent}</div>
                      <div>{submission.attempts}</div>
                      <div>
                        {submission.submittedDate
                          ? new Date(submission.submittedDate).toLocaleDateString('fr-FR')
                          : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics-content">
              <h2>Analytiques de l'activité</h2>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Distribution des scores</h3>
                  <div className="score-distribution">
                    <div className="distribution-bar">
                      <div className="bar-segment" style={{ width: '15%' }}>
                        <span>0-4</span>
                      </div>
                      <div className="bar-segment" style={{ width: '25%' }}>
                        <span>5-8</span>
                      </div>
                      <div className="bar-segment" style={{ width: '35%' }}>
                        <span>9-12</span>
                      </div>
                      <div className="bar-segment" style={{ width: '45%' }}>
                        <span>13-16</span>
                      </div>
                      <div className="bar-segment" style={{ width: '30%' }}>
                        <span>17-20</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Temps moyen par élève</h3>
                  <div className="analytics-stat">
                    <p className="analytics-value">42 min</p>
                    <p className="analytics-label">Durée moyenne</p>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Taux de réussite</h3>
                  <div className="analytics-stat">
                    <p className="analytics-value">{completionRate}%</p>
                    <p className="analytics-label">Élèves complétés</p>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Tentatives par élève</h3>
                  <div className="analytics-stat">
                    <p className="analytics-value">1.8</p>
                    <p className="analytics-label">Moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityDetailPage;
