import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, User } from 'lucide-react';
import LudoraLogo from '../../components/atoms/LudoraLogo/LudoraLogo';
import RoleCard from '../../components/molecules/RoleCard/RoleCard';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Navigate to the appropriate login form based on role
    if (role === 'teacher') {
      navigate('/login/teacher');
    } else if (role === 'parent') {
      navigate('/login/parent');
    }
  };

  return (
    <div className="login-page">
      <LudoraLogo />
      
      <div className="login-page__container">
        <div className="login-page__content">
          <div className="login-page__header">
            <h1 className="login-page__title">Portail Connexion</h1>
            <div className="login-page__badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="3" fill="rgba(165, 163, 168, 0.3)"/>
              </svg>
              <span className="login-page__badge-text">Ecole de Gratte Ciel #0711</span>
            </div>
            <div className="login-page__divider"></div>
          </div>

          <div className="login-page__roles">
            <div className="login-page__cards">
              <RoleCard 
                title="Je suis un enseignant"
                icon={<School size={80} color="#f7f7f8" />}
                onClick={() => handleRoleSelect('teacher')}
              />
              <RoleCard 
                title="Je suis un parent"
                icon={<User size={80} color="#f7f7f8" />}
                onClick={() => handleRoleSelect('parent')}
              />
            </div>

            <a href="/register" className="login-page__register-link">
              Vous n'avez pas encore de compte ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
