import './ActivitiesTableByTheme.css';
import TabItem from '../../atoms/TabItem/TabItem';
import StatusRoot from '../../atoms/StatusRoot/StatusRoot';
import Icon from '../../atoms/Icon/Icon';

const defaultTabs = [
  { id: 'all', label: 'Toutes les matieres', active: true },
  { id: 'math', label: 'Mathematiques' },
  { id: 'fr', label: 'Francais' },
  { id: 'en', label: 'Anglais' },
];

const defaultRows = [
  {
    id: 'row-1',
    activity: 'Arithmetique I',
    theme: 'Arithmetique I',
    classes: 'CM1',
    managers: [
      { id: 'u1', initials: 'MD', color: '#f97316' },
      { id: 'u2', initials: 'AL', color: '#38bdf8' },
      { id: 'u3', initials: 'GT', color: '#34d399' },
    ],
    date: '15/01/2025',
    status: 'En cours',
  },
  {
    id: 'row-2',
    activity: 'Arithmetique II',
    theme: 'Arithmetique II',
    classes: 'CE2',
    managers: [
      { id: 'u4', initials: 'EL', color: '#fb7185' },
      { id: 'u5', initials: 'JR', color: '#a78bfa' },
    ],
    date: '22/03/2023',
    status: 'Terminee',
  },
  {
    id: 'row-3',
    activity: 'Geometrie Classique',
    theme: 'Geometrie Classique',
    classes: 'CM2',
    managers: [
      { id: 'u6', initials: 'CL', color: '#f59e0b' },
    ],
    date: '30/11/2023',
    status: 'En cours',
  },
];

const AvatarStack = ({ users }) => {
  return (
    <div className="activities-table__avatars">
      {users.map((user) => (
        <div key={user.id} className="activities-table__avatar" style={{ background: user.color }}>
          {user.initials}
        </div>
      ))}
    </div>
  );
};

const ActivitiesTableByTheme = ({
  title = 'Recapitulatif des activites',
  subtitle = '+23 que la semaine derniere',
  tabs = defaultTabs,
  rows = defaultRows,
  onTabChange,
  className = '',
}) => {
  return (
    <section className={`activities-table ${className}`.trim()} data-node-id="70:20306">
      <div className="activities-table__header">
        <div>
          <h2 className="activities-table__title">{title}</h2>
          <p className="activities-table__subtitle">({subtitle})</p>
        </div>
        <div className="activities-table__tabs">
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              label={tab.label}
              active={tab.active}
              onClick={() => onTabChange?.(tab.id)}
            />
          ))}
        </div>
      </div>

      <div className="activities-table__grid">
        <div className="activities-table__head">Activite</div>
        <div className="activities-table__head">Chapitre</div>
        <div className="activities-table__head">Classes</div>
        <div className="activities-table__head">Responsable</div>
        <div className="activities-table__head">Date</div>
        <div className="activities-table__head">Actions</div>

        {rows.map((row) => (
          <div key={row.id} className="activities-table__row">
            <div className="activities-table__cell activities-table__cell--title">{row.activity}</div>
            <div className="activities-table__cell">{row.theme}</div>
            <div className="activities-table__cell">{row.classes}</div>
            <div className="activities-table__cell">
              <AvatarStack users={row.managers} />
            </div>
            <div className="activities-table__cell">{row.date}</div>
            <div className="activities-table__cell activities-table__cell--actions">
              <StatusRoot content={row.status} variant="Secondary" />
              <button className="activities-table__action" aria-label="Voir">
                <Icon name="eye" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesTableByTheme;
