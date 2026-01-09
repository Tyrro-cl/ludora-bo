import './ActivityBreadcrumb.css';

const ActivityBreadcrumb = ({ 
  items = ['Activity 1', 'Activity 2', 'Activity 3'],
  separator = '/',
  className = '' 
}) => {
  return (
    <div className={`activity-breadcrumb ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="activity-breadcrumb__item">{item}</span>
          {index < items.length - 1 && (
            <span className="activity-breadcrumb__separator">{separator}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ActivityBreadcrumb;
