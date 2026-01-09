import React, { useState } from 'react';
import './NotesPage.css';

// Icon components (simplified SVG icons)
const ExportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5-5m0 0l5 5m-5-5v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CreateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" opacity="0.3" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M22 7l-9 9-4-4-6 6m19-8h-6m6 0v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4m0 4h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" opacity="0.3" />
    <path d="M14 2v6h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// Mock data for demonstration
const mockStudents = [
  { id: 1, name: 'L. Martin', avatar: '🦊', class: 'CM1', activity: 'Addition et Substraction / Se présenter / 3+...', score: '2 / 20', scoreType: 'warning', status: 'success', statusText: 'En Bonne Voie' },
  { id: 2, name: 'S. Bernard', avatar: '🦊', class: 'CM1A', activity: 'Addition et Substraction / Se présenter / 3+...', score: '12 / 20', scoreType: 'good', status: 'support', statusText: 'Besoin de support' },
  { id: 3, name: 'C. Lefevre', avatar: '🦊', class: 'CM1B', activity: 'Addition et Substraction / Se présenter / 3+...', score: '6 / 20', scoreType: 'warning', status: 'progress', statusText: 'Amélioration' },
  { id: 4, name: 'A. Moreau', avatar: '🦊', class: 'CE6A', activity: 'Addition et Substraction / Se présenter / 3+...', score: '10 / 20', scoreType: 'good', status: 'risk', statusText: 'En Risque' },
  { id: 5, name: 'T. Garnier', avatar: '🦊', class: 'CM2B', activity: 'Addition et Substraction / Se présenter / 3+...', score: '14 / 20', scoreType: 'good', status: 'success', statusText: 'En Attente' },
  { id: 6, name: 'E. Caron', avatar: '🦊', class: 'CM1C', activity: 'Addition et Substraction / Se présenter / 3+...', score: '16 / 20', scoreType: 'good', status: 'progress', statusText: 'Amélioration' },
  { id: 7, name: 'J. Roussel', avatar: '🦊', class: 'CM6C', activity: 'Addition et Substraction / Se présenter / 3+...', score: '20 / 20', scoreType: 'good', status: 'success', statusText: 'En Bonne Voie' },
  { id: 8, name: 'F. Simon', avatar: '🦊', class: 'CM1D', activity: 'Addition et Substraction / Se présenter / 3+...', score: '2 / 20', scoreType: 'warning', status: 'risk', statusText: 'En Risque' },
  { id: 9, name: 'D. Lambert', avatar: '🦊', class: 'CM1E', activity: 'Addition et Substraction / Se présenter / 3+...', score: '4 / 20', scoreType: 'warning', status: 'support', statusText: 'Besoin de support' },
  { id: 10, name: 'P. Dubois', avatar: '🦊', class: 'CM2D', activity: 'Addition et Substraction / Se présenter / 3+...', score: '6 / 20', scoreType: 'warning', status: 'support', statusText: 'Besoin de support' },
];

const NotesPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon />;
      case 'support':
        return <BookIcon />;
      case 'progress':
        return <TrendingUpIcon />;
      case 'risk':
        return <AlertIcon />;
      default:
        return null;
    }
  };

  const getScoreClass = (scoreType) => {
    switch (scoreType) {
      case 'good':
        return 'notes-table__score--good';
      case 'warning':
        return 'notes-table__score--warning';
      case 'caution':
        return 'notes-table__score--caution';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
        return 'notes-table__status--success';
      case 'support':
        return 'notes-table__status--support';
      case 'progress':
        return 'notes-table__status--progress';
      case 'risk':
        return 'notes-table__status--risk';
      default:
        return '';
    }
  };

  return (
    <div className="notes-page">
      <div className="notes-page__container">
        {/* Header Section */}
        <div className="notes-page__header">
          <div className="notes-page__header-content">
            {/* Title Row */}
            <div className="notes-page__title-row">
              <h1 className="notes-page__title">Aperçu Notes</h1>
              <div className="notes-page__actions">
                <button className="notes-page__action-btn notes-page__action-btn--export">
                  <span className="notes-page__action-icon">
                    <ExportIcon />
                  </span>
                  <span>Exporter les notes</span>
                </button>
                <button className="notes-page__action-btn notes-page__action-btn--create">
                  <span className="notes-page__action-icon">
                    <CreateIcon />
                  </span>
                  <span>Créer une note</span>
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div className="notes-page__filter-container">
              {/* Tabs */}
              <div className="notes-page__tabs-container">
                <div className="notes-page__tabs-separator" />
                
                <button 
                  className={`notes-page__tab ${activeTab === 'all' ? 'notes-page__tab--active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  <div className="notes-page__tab-content">
                    {activeTab === 'all' && (
                      <span className="notes-page__tab-icon">
                        <FilesIcon />
                      </span>
                    )}
                    <span className="notes-page__tab-label">Toutes les notes</span>
                  </div>
                  <div className="notes-page__tab-indicator" />
                </button>

                <button 
                  className={`notes-page__tab ${activeTab === 'calculated' ? 'notes-page__tab--active' : ''}`}
                  onClick={() => setActiveTab('calculated')}
                >
                  <div className="notes-page__tab-content">
                    <span className="notes-page__tab-label">Calculées</span>
                  </div>
                  <div className="notes-page__tab-indicator" />
                </button>

                <button 
                  className={`notes-page__tab ${activeTab === 'todo' ? 'notes-page__tab--active' : ''}`}
                  onClick={() => setActiveTab('todo')}
                >
                  <div className="notes-page__tab-content">
                    <span className="notes-page__tab-label">A faire</span>
                  </div>
                  <div className="notes-page__tab-indicator" />
                </button>

                <button 
                  className={`notes-page__tab ${activeTab === 'pending' ? 'notes-page__tab--active' : ''}`}
                  onClick={() => setActiveTab('pending')}
                >
                  <div className="notes-page__tab-content">
                    <span className="notes-page__tab-label">En attente</span>
                  </div>
                  <div className="notes-page__tab-indicator" />
                </button>
              </div>

              {/* Filter Pills */}
              <div className="notes-page__filter-pills">
                <div className="notes-page__filter-pill">
                  <div className="notes-page__filter-pill-content">
                    <span className="notes-page__filter-pill-label">Classe(s)</span>
                    <span className="notes-page__filter-pill-icon">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                <div className="notes-page__filter-pill">
                  <div className="notes-page__filter-pill-content">
                    <span className="notes-page__filter-pill-label">Type d'activités</span>
                    <span className="notes-page__filter-pill-icon">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>

                <div className="notes-page__filter-pill">
                  <div className="notes-page__filter-pill-content">
                    <span className="notes-page__filter-pill-label">Diagnostic</span>
                    <span className="notes-page__filter-pill-icon">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="notes-page__separator" />
          </div>
        </div>

        {/* Table Section */}
        <div className="notes-page__table-container">
          <div className="notes-table">
            {mockStudents.map((student, index) => (
              <React.Fragment key={student.id}>
                {/* Élèves Column */}
                <div className={`notes-table__cell ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <div className="notes-table__student">
                    <div className="notes-table__avatar">
                      <span style={{ fontSize: '24px' }}>{student.avatar}</span>
                    </div>
                    <span className="notes-table__student-name">{student.name}</span>
                  </div>
                </div>

                {/* Classe Column */}
                <div className={`notes-table__cell ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <span className="notes-table__class">{student.class}</span>
                </div>

                {/* Activités en cours Column */}
                <div className={`notes-table__cell ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <div className="notes-table__activity">
                    <span className="notes-table__activity-text">Addition et Substraction</span>
                    <span className="notes-table__activity-separator">/</span>
                    <span className="notes-table__activity-text">Se présenter</span>
                    <span className="notes-table__activity-separator">/</span>
                    <span className="notes-table__activity-text">3+...</span>
                  </div>
                </div>

                {/* Moyenne Column */}
                <div className={`notes-table__cell ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <span className={`notes-table__score ${getScoreClass(student.scoreType)}`}>
                    {student.score}
                  </span>
                </div>

                {/* Diagnostic Column */}
                <div className={`notes-table__cell ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <div className={`notes-table__status ${getStatusClass(student.status)}`}>
                    <span className="notes-table__status-icon">
                      {getStatusIcon(student.status)}
                    </span>
                    <span className="notes-table__status-text">{student.statusText}</span>
                  </div>
                </div>

                {/* Actions Column */}
                <div className={`notes-table__cell notes-table__cell--centered ${index % 2 === 0 ? 'notes-table__cell--odd' : 'notes-table__cell--even'}`}>
                  <button className="notes-table__action-btn">
                    <span className="notes-table__action-icon">
                      <MoreIcon />
                    </span>
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
