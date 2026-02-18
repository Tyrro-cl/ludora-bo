import './Input.css';

const Input = ({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  wrapperClassName = '',
}) => {
  return (
    <div className={`input-wrapper ${wrapperClassName}`.trim()}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''} ${className}`.trim()}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
