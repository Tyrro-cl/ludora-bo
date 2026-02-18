import React from 'react';
import './BentoSelect.css';
import Icon from '../../atoms/Icon/Icon';

const BentoSelect = ({ 
  textTop = true, 
  textBottom = false,
  textTopContent = 'Text Placeholder',
  textBottomContent = 'Text Placeholder',
  iconName = null,
  state = 'Default',
  textPosition = 'Default',
  onClick,
  className = ''
}) => {
  const isInside = textPosition === 'Inside';
  const stateClass = `state-${state.toLowerCase()}`;
  const positionClass = `position-${textPosition.toLowerCase()}`;
  const isClickable = state === 'Hover';

  const containerClasses = `bentoselect-root ${stateClass} ${positionClass} ${className}`;

  const content = (
    <>
      <div className="bentoselect-container">
        {textTop && textPosition === 'Default' && (
          <div className="bentoselect-slot-top">
            <p className="bentoselect-text">{textTopContent}</p>
          </div>
        )}

        <div className={`bentoselect-slot-main ${isInside ? 'with-text-inside' : ''}`}>
          {textTop && textPosition === 'Inside' && (
            <div className="bentoselect-slot-top-inside">
              <p className="bentoselect-text-inside">{textTopContent}</p>
            </div>
          )}

          <div className="bentoselect-icon-wrapper">
            <Icon name={iconName || 'figma'} size={136} />
          </div>

          {textBottom && textPosition === 'Inside' && (
            <div className="bentoselect-slot-bottom-inside">
              <p className="bentoselect-text-inside">{textBottomContent}</p>
            </div>
          )}

          <div className="bentoselect-background">
            <div className="bentoselect-background-inner" />
          </div>
        </div>
      </div>
    </>
  );

  if (isClickable) {
    return (
      <button className={containerClasses} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={containerClasses}>{content}</div>;
};

export default BentoSelect;
