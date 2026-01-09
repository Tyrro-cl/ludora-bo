import React from 'react';
import StudentInfo from '../../molecules/StudentInfo/StudentInfo';
import ActivityBreadcrumb from '../../molecules/ActivityBreadcrumb/ActivityBreadcrumb';
import ScoreBadge from '../../molecules/ScoreBadge/ScoreBadge';
import StudentStatus from '../../atoms/StudentStatus/StudentStatus';
import './NotesTableRow.css';

const NotesTableRow = ({ student }) => {
  const {
    name,
    avatar,
    avatarUrl,
    activity,
    score,
    scoreTotal,
    scoreVariant,
    status,
    statusType,
    date,
    time,
  } = student;

  return (
    <div className="notes-table-row">
      <div className="notes-table-row__cell">
        <StudentInfo name={name} avatar={avatar} avatarUrl={avatarUrl} />
      </div>
      
      <div className="notes-table-row__cell">
        <ActivityBreadcrumb items={activity} separator=" / " />
      </div>
      
      <div className="notes-table-row__cell notes-table-row__cell--centered">
        <ScoreBadge 
          score={score} 
          total={scoreTotal} 
          variant={scoreVariant} 
        />
      </div>
      
      <div className="notes-table-row__cell notes-table-row__cell--centered">
        <StudentStatus label={status} type={statusType} />
      </div>
      
      <div className="notes-table-row__cell notes-table-row__cell--centered">
        <div>
          <div>{date}</div>
          <div style={{ color: 'var(--color-brand-tertiary-50)', fontSize: '12px' }}>
            {time}
          </div>
        </div>
      </div>
      
      <div className="notes-table-row__cell notes-table-row__cell--actions notes-table-row__cell--centered">
        <button className="notes-table-row__action-button" aria-label="View details">
          <svg className="notes-table-row__action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
          </svg>
        </button>
        
        <button className="notes-table-row__action-button" aria-label="Edit">
          <svg className="notes-table-row__action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
          </svg>
        </button>
        
        <button className="notes-table-row__action-button" aria-label="Delete">
          <svg className="notes-table-row__action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotesTableRow;
