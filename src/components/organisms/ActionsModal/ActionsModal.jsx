import './ActionsModal.css';
import Button from '../../atoms/Button';
import SegmentedActions from '../SegmentedActions';

const ActionsModal = ({ 
  state = 'Default',
  className = '' 
}) => {
  const isDefault = state === 'Default';

  return (
    <div 
      className={`actions-modal ${className}`}
      data-node-id="1539:159259"
    >
      <Button 
        iconStart="figma"
        iconEnd="figma"
        state="Idle"
        scale="2x"
      >
        Placeholder
      </Button>

      <div className="actions-modal-separator" />

      {isDefault && (
        <>
          <SegmentedActions 
            slot1={true}
            slot2={true}
            slot3={true}
            slot4={false}
          />

          <div className="actions-modal-separator" />

          <Button 
            iconStart="figma"
            iconEnd="figma"
            state="Idle"
            scale="2x"
            variant="primary"
          >
            Placeholder
          </Button>
        </>
      )}

      {state === 'No Actions' && (
        <>
          <Button 
            iconStart="figma"
            iconEnd="figma"
            state="Idle"
            scale="2x"
            variant="primary"
          >
            Placeholder
          </Button>
        </>
      )}
    </div>
  );
};

export default ActionsModal;
