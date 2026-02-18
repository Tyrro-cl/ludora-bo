import './BentoHelpV.css';
import { Icon } from '../../atoms/Icon';
import CallToAction from '../../atoms/CallToAction';

const BentoHelpV = ({ 
  variant = 'Default',
  className = '' 
}) => {
  const isCollapsed = variant === 'Collapsed';

  return (
    <div 
      className={`bento-help-v ${variant === 'Collapsed' ? 'collapsed' : ''} ${className}`}
      data-node-id="999:59007"
    >
      <div className="bento-help-v-container">
        <div className="bento-help-v-header">
          <div className={`bento-help-v-icon ${isCollapsed ? 'collapsed-icon' : ''}`}>
            <Icon name={isCollapsed ? "message-circle-question" : "book-open"} size="24" />
          </div>
          
          {!isCollapsed && (
            <div className="bento-help-v-text">
              <div className="bento-help-v-title">
                Besoin d'aide?
              </div>
              <div className="bento-help-v-description">
                Consultez notre guide d'utilisation et nos ressources
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="bento-help-v-action">
            <CallToAction 
              icon="figma"
              label="Placeholder"
            />
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="bento-help-v-background">
          <div className="bento-help-v-gradient" />
          <div className="bento-help-v-ellipse" />
        </div>
      )}
    </div>
  );
};

export default BentoHelpV;
