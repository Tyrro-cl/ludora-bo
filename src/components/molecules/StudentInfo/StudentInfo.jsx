import './StudentInfo.css';

const StudentInfo = ({ 
  name = 'Student Name', 
  avatar = '🦊',
  avatarUrl = null,
  className = '' 
}) => {
  return (
    <div className={`student-info ${className}`}>
      <div className="student-info__avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="student-info__avatar-img" />
        ) : (
          <span style={{ fontSize: '24px' }}>{avatar}</span>
        )}
      </div>
      <span className="student-info__name">{name}</span>
    </div>
  );
};

export default StudentInfo;
