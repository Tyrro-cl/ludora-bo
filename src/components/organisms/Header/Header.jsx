import './Header.css';
import Breadcrumb from '../../molecules/Breadcrumb/Breadcrumb';
import Search from '../../molecules/Search/Search';

const Header = ({
  crumb1Text = 'Crumb1',
  crumbText = 'ItemSelected',
  searchPlaceholder = 'Rechercher... (Addition, TP, Dictee)',
  className = '',
}) => {
  return (
    <div className={`dashboard-header ${className}`.trim()} data-node-id="600:28467">
      <Breadcrumb item1 crumb1Text={crumb1Text} crumbText={crumbText} />
      <Search placeholder={searchPlaceholder} />
    </div>
  );
};

export default Header;
