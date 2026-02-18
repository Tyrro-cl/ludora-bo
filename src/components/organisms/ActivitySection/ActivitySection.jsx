import './ActivitySection.css';
import Button from '../../atoms/Button/Button';
import StudentStatus from '../../atoms/StudentStatus/StudentStatus';
import Icon from '../../atoms/Icon/Icon';

const defaultActivities = [
  {
    id: 'activity-1',
    status: 'En cours',
    duration: '00h:00m:00s',
  },
  {
    id: 'activity-2',
    status: 'En cours',
    duration: '00h:00m:00s',
  },
  {
    id: 'activity-3',
    status: 'En cours',
    duration: '00h:00m:00s',
  },
];

const ActivityCard = ({ status, duration }) => {
  return (
    <div className="activity-card">
      <div className="activity-card__status">
        <StudentStatus content={`${status} / ${duration}`} variant="Primary" />
      </div>
      <div className="activity-card__icon">
        <Icon name="image" size={32} color="var(--color-text-on-dark-60)" />
      </div>
    </div>
  );
};

const ActivitySection = ({
  title = 'Ca se passe ici !',
  subtitle = 'Qu-est-ce qu\'on apprendre ?',
  description =
    "Suivez en un coup d\'oeil les apprentissages en cours dans l\'application.\nLes enfants explorent differents univers a travers des mini-jeux educatifs.",
  ctaLabel = 'Placeholder',
  onCtaClick,
  activities = defaultActivities,
  className = '',
}) => {
  return (
    <section className={`activity-section ${className}`.trim()} data-node-id="585:96911">
      <div className="activity-section__text">
        <p className="activity-section__subtitle">{subtitle}</p>
        <h2 className="activity-section__title">{title}</h2>
        <p className="activity-section__description">{description}</p>
        <Button variant="primary" scale="1x" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
      <div className="activity-section__carousel" role="list">
        {activities.map((activity) => (
          <div key={activity.id} role="listitem" className="activity-section__item">
            <ActivityCard status={activity.status} duration={activity.duration} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySection;
