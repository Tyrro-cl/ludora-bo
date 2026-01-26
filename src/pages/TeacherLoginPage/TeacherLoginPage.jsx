import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LudoraLogo from '../../components/atoms/LudoraLogo/LudoraLogo';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import './TeacherLoginPage.css';

const TeacherLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('teacher');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/home/overview');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="teacher-login-page">
      <LudoraLogo />
      
      <div className="teacher-login-page__container">
        <div className="teacher-login-page__content">
          <div className="teacher-login-page__header">
            <h1 className="teacher-login-page__title">Portail Connexion</h1>
            
            <div className="teacher-login-page__tabs">
              <button 
                className={`teacher-login-page__tab ${activeTab === 'school' ? 'teacher-login-page__tab--inactive' : ''}`}
                onClick={() => setActiveTab('school')}
              >
                École de la région #0711
              </button>
              <button 
                className={`teacher-login-page__tab ${activeTab === 'teacher' ? 'teacher-login-page__tab--active' : ''}`}
                onClick={() => setActiveTab('teacher')}
              >
                Login enseignant
              </button>
            </div>
            
            <div className="teacher-login-page__divider"></div>
          </div>

          <form className="teacher-login-page__form" onSubmit={handleSubmit}>
            <div className="teacher-login-page__field">
              <label className="teacher-login-page__label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C10.9 2 10 2.9 10 4V8H14V4C14 2.9 13.1 2 12 2ZM6 8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V10C22 8.9 21.1 8 20 8H18V4C18 1.8 16.2 0 14 0H10C7.8 0 6 1.8 6 4V8Z"/>
                </svg>
                Nom d'utilisateur
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent.gratteciel74@ludora.org"
                required
                className="teacher-login-page__input"
              />
            </div>

            <div className="teacher-login-page__field">
              <label className="teacher-login-page__label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z"/>
                </svg>
                Mot de passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****************"
                required
                className="teacher-login-page__input"
              />
            </div>

            <a href="/forgot-password" className="teacher-login-page__forgot">
              Mot de passe oublié ?
            </a>

            {error && (
              <div className="teacher-login-page__error">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth
              disabled={isLoading}
              className="teacher-login-page__submit"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <a href="/register" className="teacher-login-page__register">
            Vous n'avez pas encore de compte ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeacherLoginPage;
