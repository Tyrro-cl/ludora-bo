import './FilterPill.css';

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterPill = ({ 
  label = 'Filter', 
  onClick, 
  className = '' 
}) => {
  return (
    <div className={`filter-pill ${className}`}>
      <div className="filter-pill__content" onClick={onClick}>
        <span className="filter-pill__label">{label}</span>
        <span className="filter-pill__icon">
          <ChevronDownIcon />
        </span>
      </div>
    </div>
  );
};

export default FilterPill;
