import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
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

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Mock activity types for facette modal
const ACTIVITY_TYPES = [
  'Addition',
  'Soustraction',
  'Multiplication',
  'Division',
  'Dictée',
  'Lecture',
  'Se présenter',
  'TP',
];

const NotesPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [facetteModalOpen, setFacetteModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setFacetteModalOpen(false);
    };
    if (facetteModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [facetteModalOpen]);

  const handleExportNotes = () => {
    // Prepare data for CSV export
    const headers = ['Nom', 'Classe', 'Activité', 'Note', 'Statut', 'Date'];
    const rows = mockStudents.map(student => [
      student.name,
      student.class,
      student.activity,
      student.score,
      student.statusText,
      new Date().toLocaleDateString('fr-FR')
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `notes_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <DashboardLayout user={user} onLogout={logout}>
    <div className="notes-page">
      <div className="notes-page__container">
        {/* Header Section */}
        <div className="notes-page__header">
          <div className="notes-page__header-content">
            {/* Title Row */}
            <div className="notes-page__title-row">
              <h1 className="notes-page__title">Aperçu Notes</h1>
              <div className="notes-page__actions">
                <button
                  type="button"
                  className="notes-page__action-btn notes-page__action-btn--export"
                  onClick={handleExportNotes}
                >
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
                  <button
                    type="button"
                    className={`notes-page__filter-pill-content notes-page__filter-pill-content--clickable ${facetteModalOpen ? 'notes-page__filter-pill-content--active' : ''}`}
                    onClick={() => setFacetteModalOpen((prev) => !prev)}
                    aria-expanded={facetteModalOpen}
                    aria-haspopup="dialog"
                  >
                    <span className="notes-page__filter-pill-label">Type d&apos;activités</span>
                    <span className="notes-page__filter-pill-icon">
                      <ChevronDownIcon />
                    </span>
                  </button>
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
          {/* Column headers */}
          <div className="notes-table__header">
            <span className="notes-table__header-cell notes-table__header-cell--eleves">Élèves</span>
            <span className="notes-table__header-cell notes-table__header-cell--classe">Classe</span>
            <span className="notes-table__header-cell notes-table__header-cell--activites">Activités en cours</span>
            <span className="notes-table__header-cell notes-table__header-cell--moyenne">Moyenne</span>
            <span className="notes-table__header-cell notes-table__header-cell--diagnostic">Diagnostic</span>
            <span className="notes-table__header-cell notes-table__header-cell--actions" />
          </div>

          <div className="notes-table">
            {mockStudents.map((student, index) => {
              const isFirst = index === 0;
              const isLast = index === mockStudents.length - 1;
              const rowClasses = [
                'notes-table__row',
                index % 2 === 0 ? 'notes-table__row--odd' : 'notes-table__row--even',
                isFirst && 'notes-table__row--first',
                isLast && 'notes-table__row--last',
              ].filter(Boolean).join(' ');

              return (
                <div key={student.id} className={rowClasses}>
                  <div className="notes-table__cell notes-table__cell--eleves">
                    <div className="notes-table__student">
                      <div className="notes-table__avatar">
                        <span style={{ fontSize: '24px' }}>{student.avatar}</span>
                      </div>
                      <span className="notes-table__student-name">{student.name}</span>
                    </div>
                  </div>

                  <div className="notes-table__cell notes-table__cell--classe">
                    <span className="notes-table__class">{student.class}</span>
                  </div>

                  <div className="notes-table__cell notes-table__cell--activites">
                    <span className="notes-table__activity-text">Lot de jeu basiques A</span>
                  </div>

                  <div className="notes-table__cell notes-table__cell--moyenne">
                    <span className={`notes-table__score ${getScoreClass(student.scoreType)}`}>
                      {student.score}
                    </span>
                  </div>

                  <div className="notes-table__cell notes-table__cell--diagnostic">
                    <div className={`notes-table__status ${getStatusClass(student.status)}`}>
                      <span className="notes-table__status-icon">
                        {getStatusIcon(student.status)}
                      </span>
                      <span className="notes-table__status-text">{student.statusText}</span>
                    </div>
                  </div>

                  <div className="notes-table__cell notes-table__cell--actions">
                    <button className="notes-table__action-btn">
                      <span className="notes-table__action-icon">
                        <MoreIcon />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Facette modal for Type d'activités */}
      {facetteModalOpen && (
        <div
          className="notes-page__facette-modal-backdrop"
          onClick={() => setFacetteModalOpen(false)}
          role="presentation"
        >
          <div
            className="notes-page__facette-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="facette-modal-title"
          >
            <div className="notes-page__facette-modal-header">
              <h3 id="facette-modal-title">Type d&apos;activités</h3>
              <button
                type="button"
                className="notes-page__facette-modal-close"
                onClick={() => setFacetteModalOpen(false)}
                aria-label="Fermer"
              >
                <XIcon />
              </button>
            </div>
            <div className="notes-page__facette-modal-body">
              {ACTIVITY_TYPES.map((type) => (
                <label key={type} className="notes-page__facette-modal-item">
                  <input type="checkbox" defaultChecked />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default NotesPage;
