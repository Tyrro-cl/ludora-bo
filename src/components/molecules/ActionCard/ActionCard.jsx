import './ActionCard.css';
import Button from '../../atoms/Button/Button';

const ActionCard = ({
  tag = 'Concu pour la pedagogie',
  title = "Certificats d'aptitude aux fonctions de formateur",
  description =
    'Conformes avec les directives ministerielles et les objectifs du programme scolaire',
  ctaLabel = 'Placeholder',
  onCtaClick,
  imageUrl,
  className = '',
}) => {
  return (
    <article className={`action-card ${className}`.trim()} data-node-id="1156:34739">
      <div className="action-card__content">
        <div className="action-card__text">
          <p className="action-card__tag">{tag}</p>
          <h3 className="action-card__title">{title}</h3>
        </div>
        <p className="action-card__description">{description}</p>
        <div className="action-card__cta">
          <Button variant="primary" scale="1x" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </div>
      </div>
      <div className="action-card__image" aria-hidden="true">
        {imageUrl ? (
          <img src={imageUrl} alt="" />
        ) : (
          <div className="action-card__image-placeholder" />
        )}
      </div>
    </article>
  );
};

export default ActionCard;
