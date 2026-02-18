import './Repassages.css';
import StatusRoot from '../../atoms/StatusRoot/StatusRoot';
import Icon from '../../atoms/Icon/Icon';

const defaultRows = [
  {
    id: 'rep-1',
    subject: 'Mathematiques',
    unit: 'Operations',
    students: '24 eleves',
    status: 'Normal',
    progress: 42,
  },
  {
    id: 'rep-2',
    subject: 'Francais',
    unit: 'Lecture',
    students: '18 eleves',
    status: 'Bien',
    progress: 75,
  },
  {
    id: 'rep-3',
    subject: 'Anglais',
    unit: 'Expressions',
    students: '20 eleves',
    status: 'Alerte',
    progress: 28,
  },
];

const Repassages = ({
  title = 'Suivi des repassages',
  cycleLabel = '3 cycles faits ce mois',
  rows = defaultRows,
  className = '',
}) => {
  return (
    <section className={`repassages ${className}`.trim()} data-node-id="64:1325">
      <header className="repassages__header">
        <div>
          <h2 className="repassages__title">{title}</h2>
          <div className="repassages__cycle">
            <Icon name="circleCheck" size={12} />
            <span>{cycleLabel}</span>
          </div>
        </div>
        <button className="repassages__menu" aria-label="Options">
          <Icon name="moreVertical" size={16} />
        </button>
      </header>

      <div className="repassages__table">
        <div className="repassages__head">Matiere</div>
        <div className="repassages__head">Unite</div>
        <div className="repassages__head">Eleves</div>
        <div className="repassages__head">Etat</div>
        <div className="repassages__head">Progression</div>

        {rows.map((row) => (
          <div key={row.id} className="repassages__row">
            <div className="repassages__cell repassages__cell--strong">{row.subject}</div>
            <div className="repassages__cell">{row.unit}</div>
            <div className="repassages__cell">{row.students}</div>
            <div className="repassages__cell">
              <StatusRoot content={row.status} variant="Secondary" />
            </div>
            <div className="repassages__cell">
              <div className="repassages__progress">
                <div className="repassages__progress-bar" style={{ width: `${row.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Repassages;
