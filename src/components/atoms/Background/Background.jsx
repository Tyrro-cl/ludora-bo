import './Background.css';

const Background = ({ 
  variant = 'Login',
  state = 'Idle',
  className = '' 
}) => {
  const variantClass = `variant-${variant.toLowerCase()}`;
  const stateClass = `state-${state.toLowerCase()}`;

  return (
    <div 
      className={`background-root ${variantClass} ${stateClass} ${className}`}
      data-node-id="1441:518959"
    >
      <div className="background-inner" />
    </div>
  );
};

export default Background;
