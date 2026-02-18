import './SegmentedActions.css';
import CallToAction from '../../atoms/CallToAction';

const SegmentedActions = ({ 
  actions = [],
  slot1 = true, 
  slot2 = true, 
  slot3 = true, 
  slot4 = true,
  className = '' 
}) => {
  const slots = [slot1, slot2, slot3, slot4];
  
  return (
    <div 
      className={`segmented-actions ${className}`}
      data-node-id="1537:157576"
    >
      {slots.map((isVisible, idx) => 
        isVisible ? (
          <div key={idx} className="segmented-actions-item">
            <CallToAction 
              icon="figma"
              label="Placeholder"
            />
          </div>
        ) : null
      )}
    </div>
  );
};

export default SegmentedActions;
