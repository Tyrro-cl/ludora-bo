import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button/Button';
import Icon from '../../components/atoms/Icon/Icon';
import StudentStatus from '../../components/atoms/StudentStatus/StudentStatus';
import ScoreBadge from '../../components/molecules/ScoreBadge/ScoreBadge';
import ActivityBreadcrumb from '../../components/molecules/ActivityBreadcrumb/ActivityBreadcrumb';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import axiosInstance from '../../services/authService';
import './StudentDetailPage.css';

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activities');

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      // Fetch student info
      const studentRes = await axiosInstance.get(`/students/${studentId}`);
      setStudent(studentRes.data);

      // Fetch student activities
      const activitiesRes = await axiosInstance.get(`/students/${studentId}/activities`);
      setActivities(Array.isArray(activitiesRes.data) ? activitiesRes.data : []);

      // Fetch student notes
      const notesRes = await axiosInstance.get(`/students/${studentId}/notes`);
      setNotes(Array.isArray(notesRes.data) ? notesRes.data : []);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Mock data for development
      setStudent({
        id: studentId,
        firstName: 'Emma',
        lastName: 'Martin',
        class: '6ème A',
        avatarUrl: 'https://www.figma.com/api/mcp/asset/2100ba69-46ca-402e-9833-407695ebd713',
        status: 'En bonne voie',
        average: 15.5,
        parentEmail: 'parent.martin@email.com',
        dateOfBirth: '2012-05-15',
      });

      setActivities([
        {
          id: 1,
          name: 'Mathématiques - Fractions',
          theme: 'Nombres et calculs',
          status: 'En cours',
          progress: 75,
          score: 16,
          dueDate: '2026-02-15',
        },
        {
          id: 2,
          name: 'Français - Grammaire',
          theme: 'Langue française',
          status: 'Terminé',
          progress: 100,
          score: 14,
          completedDate: '2026-01-20',
        },
        {
          id: 3,
          name: 'Histoire - Révolution française',
          theme: 'Histoire',
          status: 'En cours',
          progress: 45,
          score: null,
          dueDate: '2026-02-20',
        },
      ]);

      setNotes([
        { id: 1, subject: 'Mathématiques', note: 16, date: '2026-01-20', coefficient: 2 },
        { id: 2, subject: 'Français', note: 14, date: '2026-01-18', coefficient: 2 },
        { id: 3, subject: 'Histoire', note: 15, date: '2026-01-15', coefficient: 1 },
        { id: 4, subject: 'Sciences', note: 17, date: '2026-01-12', coefficient: 1 },
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
    { id: 'students', label: "Tableau d'Éleves", icon: 'users', selected: true, onClick: () => navigate('/notes') },
    { id: 'activities', label: 'Activités', icon: 'listTodo', onClick: () => navigate('/activities') },
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
      'En bonne voie': 'success',
      'Besoin de support': 'warning',
      'Amélioration': 'info',
      'En Risque': 'danger',
    };
    return statusMap[status] || 'default';
  };

  if (loading) {
    return (
      <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="students">
        <div className="student-detail-loading">
          <p>Chargement des informations de l'élève...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="students">
        <div className="student-detail-error">
          <p>Élève non trouvé</p>
          <Button variant="primary" onClick={() => navigate('/notes')}>
            Retour à la liste
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout} navItems={navItems} selectedNavItem="students">
      <div className="student-detail-page">
        {/* Breadcrumb */}
        <div className="student-detail-breadcrumb">
          <button className="breadcrumb-link" onClick={() => navigate('/notes')}>
            Tableau d'élèves
          </button>
          <Icon name="chevronRight" size={16} />
          <span className="breadcrumb-current">
            {student.firstName} {student.lastName}
          </span>
        </div>

        {/* Header */}
        <div className="student-detail-header">
          <div className="student-header-main">
            <div className="student-avatar-large">
              <img src={student.avatarUrl} alt={`${student.firstName} ${student.lastName}`} />
            </div>
            <div className="student-header-info">
              <h1>
                {student.firstName} {student.lastName}
              </h1>
              <p className="student-class">{student.class}</p>
              <div className="student-header-meta">
                <StudentStatus variant={getStatusVariant(student.status)} text={student.status} />
                <ScoreBadge score={student.average} variant={getScoreColor(student.average)} />
              </div>
            </div>
          </div>
          <div className="student-header-actions">
            <Button variant="secondary" size="medium">
              <Icon name="mail" size={18} />
              Contacter parent
            </Button>
            <Button variant="primary" size="medium">
              <Icon name="edit" size={18} />
              Modifier
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="student-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="trophy" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Moyenne générale</p>
              <p className="stat-value">{student.average}/20</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="listChecks" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Activités complétées</p>
              <p className="stat-value">
                {activities.filter((a) => a.status === 'Terminé').length}/{activities.length}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="target" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Taux de réussite</p>
              <p className="stat-value">
                {activities.length > 0
                  ? Math.round((activities.filter((a) => a.status === 'Terminé').length / activities.length) * 100)
                  : 0}
                %
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Icon name="calendar" size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-label">Activités en cours</p>
              <p className="stat-value">{activities.filter((a) => a.status === 'En cours').length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="student-detail-tabs">
          <button
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activités
          </button>
          <button className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
            Notes
          </button>
          <button className={`tab-button ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
            Informations
          </button>
        </div>

        {/* Tab Content */}
        <div className="student-detail-content">
          {activeTab === 'activities' && (
            <div className="activities-list">
              <h2>Activités de l'élève</h2>
              {activities.length === 0 ? (
                <p className="empty-state">Aucune activité pour cet élève</p>
              ) : (
                <div className="activities-table">
                  {activities.map((activity) => (
                    <div key={activity.id} className="activity-row">
                      <div className="activity-info">
                        <h3>{activity.name}</h3>
                        <ActivityBreadcrumb theme={activity.theme} activity={activity.name} />
                      </div>
                      <div className="activity-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${activity.progress}%` }}></div>
                        </div>
                        <span className="progress-text">{activity.progress}%</span>
                      </div>
                      <div className="activity-score">
                        {activity.score ? <ScoreBadge score={activity.score} variant={getScoreColor(activity.score)} /> : <span className="no-score">-</span>}
                      </div>
                      <div className="activity-status">
                        <span className={`status-badge status-${activity.status.toLowerCase().replace(/ /g, '-')}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-list">
              <h2>Notes de l'élève</h2>
              {notes.length === 0 ? (
                <p className="empty-state">Aucune note pour cet élève</p>
              ) : (
                <div className="notes-table">
                  <div className="notes-table-header">
                    <div>Matière</div>
                    <div>Note</div>
                    <div>Coefficient</div>
                    <div>Date</div>
                  </div>
                  {notes.map((note) => (
                    <div key={note.id} className="notes-table-row">
                      <div>{note.subject}</div>
                      <div>
                        <ScoreBadge score={note.note} variant={getScoreColor(note.note)} />
                      </div>
                      <div>{note.coefficient}</div>
                      <div>{new Date(note.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="student-info">
              <h2>Informations personnelles</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Nom complet</label>
                  <p>
                    {student.firstName} {student.lastName}
                  </p>
                </div>
                <div className="info-item">
                  <label>Classe</label>
                  <p>{student.class}</p>
                </div>
                <div className="info-item">
                  <label>Date de naissance</label>
                  <p>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Non renseignée'}</p>
                </div>
                <div className="info-item">
                  <label>Email parent</label>
                  <p>{student.parentEmail || 'Non renseigné'}</p>
                </div>
                <div className="info-item">
                  <label>Statut</label>
                  <StudentStatus variant={getStatusVariant(student.status)} text={student.status} />
                </div>
                <div className="info-item">
                  <label>Moyenne</label>
                  <ScoreBadge score={student.average} variant={getScoreColor(student.average)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDetailPage;
