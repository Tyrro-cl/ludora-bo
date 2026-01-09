import React from 'react';
import TabItem from '../../atoms/TabItem/TabItem';
import FilterPill from '../../atoms/FilterPill/FilterPill';
import './NotesFilterBar.css';

const NotesFilterBar = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  filters = [] 
}) => {
  return (
    <div className="notes-filter-bar">
      <div className="notes-filter-bar__tabs">
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            showIcon={tab.showIcon}
            icon={tab.icon}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
      
      <div className="notes-filter-bar__filters">
        {filters.map((filter) => (
          <FilterPill
            key={filter.id}
            label={filter.label}
            onClick={filter.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesFilterBar;
