import './Breadcrumb.css';
import Icon from '../../atoms/Icon/Icon';

const Breadcrumb = ({ 
  item1 = true,
  item2 = false,
  item3 = false,
  crumbSelected = true,
  crumbText = 'ItemSelected',
  crumb1Text = 'Crumb1',
  crumb2Text = 'Crumb2',
  crumb3Text = 'Crumb3',
  className = '' 
}) => {
  return (
    <div 
      className={`breadcrumb ${className}`}
      data-node-id="555:80780"
    >
      <div className="breadcrumb-icon">
        <Icon name="figma" size="20" />
      </div>

      <div className="breadcrumb-items">
        {item1 && (
          <div className="breadcrumb-item">
            <span className="breadcrumb-text">{crumb1Text}</span>
            <span className="breadcrumb-separator">/</span>
          </div>
        )}

        {item2 && (
          <div className="breadcrumb-item">
            <span className="breadcrumb-text">{crumb2Text}</span>
            <span className="breadcrumb-separator">/</span>
          </div>
        )}

        {item3 && (
          <div className="breadcrumb-item">
            <span className="breadcrumb-text">{crumb3Text}</span>
            <span className="breadcrumb-separator">/</span>
          </div>
        )}

        {crumbSelected && (
          <div className="breadcrumb-item breadcrumb-selected">
            <span className="breadcrumb-text">{crumbText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
