import { useNavigate } from 'react-router-dom';
import { School, User } from 'lucide-react';
import LudoraLogo from '../../components/atoms/LudoraLogo/LudoraLogo';
import RoleCard from '../../components/molecules/RoleCard/RoleCard';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
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
          <header className="login-page__header">
            <h1 className="login-page__title">Portail Connexion</h1>
            <div className="login-page__badge">
              <span className="login-page__badge-text">Ecole de la Région #1254</span>
            </div>
            <div className="login-page__divider" aria-hidden="true" />
          </header>

          <section className="login-page__roles">
            <div className="login-page__role-options">
              <div className="login-page__role-option">
                <span className="login-page__role-label">Enseignant</span>
                <RoleCard
                  title="Enseignant"
                  icon={<School size={48} strokeWidth={1.5} />}
                  onClick={() => handleRoleSelect('teacher')}
                />
              </div>
              <div className="login-page__role-option">
                <span className="login-page__role-label">Parent</span>
                <RoleCard
                  title="Parent"
                  icon={<User size={48} strokeWidth={1.5} />}
                  onClick={() => handleRoleSelect('parent')}
                />
              </div>
            </div>

            <a href="/register" className="login-page__register-link">
              Vous n&apos;avez pas encore de compte ?
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
