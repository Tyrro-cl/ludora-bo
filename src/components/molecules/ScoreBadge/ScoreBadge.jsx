import './ScoreBadge.css';

const ScoreBadge = ({ 
  score = 0,
  total = 20,
  variant = 'neutral', // 'good', 'warning', 'caution', 'neutral'
  className = '' 
}) => {
  return (
    <span className={`score-badge score-badge--${variant} ${className}`}>
      {score} / {total}
    </span>
  );
};

export default ScoreBadge;
