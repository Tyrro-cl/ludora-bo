import './Search.css';
import Input from '../../atoms/Input/Input';
import Icon from '../../atoms/Icon/Icon';

const Search = ({
  placeholder = 'Rechercher... (Addition, TP, Dictee)',
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`search ${className}`.trim()} data-node-id="1373:243063">
      <Icon name="search" size={18} className="search-icon" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
        wrapperClassName="search-input-wrapper"
      />
    </div>
  );
};

export default Search;
