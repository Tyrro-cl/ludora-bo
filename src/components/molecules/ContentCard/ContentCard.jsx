import './ContentCard.css';
import Button from '../../atoms/Button/Button';

const ContentCard = ({
  tag = '#Handicap',
  title = 'Dans la vie des sourds-muets',
  description =
    "Notre solution educative integre les recommandations du Ministere de l'Education Nationale en matiere d'inclusion scolaire",
  ctaLabel = 'Placeholder',
  onCtaClick,
  imageUrl,
  className = '',
}) => {
  return (
    <article className={`content-card ${className}`.trim()} data-node-id="1156:34740">
      <div className="content-card__background" aria-hidden="true">
        {imageUrl ? <img src={imageUrl} alt="" /> : <div className="content-card__image" />}
        <div className="content-card__overlay" />
      </div>
      <div className="content-card__content">
        <div className="content-card__text">
          <p className="content-card__tag">{tag}</p>
          <h3 className="content-card__title">{title}</h3>
          <p className="content-card__description">{description}</p>
        </div>
        <div className="content-card__cta">
          <Button variant="primary" scale="1x" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ContentCard;
