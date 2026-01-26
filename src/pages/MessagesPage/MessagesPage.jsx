import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/atoms/Button/Button';
import DashboardLayout from '../../components/organisms/DashboardLayout/DashboardLayout';
import axiosInstance from '../../services/authService';
import './MessagesPage.css';

const MessagesPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Placeholder for API call - replace with actual endpoint
      const response = await axiosInstance.get('/messages');
      
      const messagesData = Array.isArray(response.data)
        ? response.data
        : (Array.isArray(response.data?.messages) ? response.data.messages : []);
      
      setMessages(messagesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Use mock data for demo
      setMessages([
        {
          id: 1,
          sender: 'Parent #1',
          subject: 'Question about activity',
          preview: 'Hello, I have a question about...',
          timestamp: new Date(Date.now() - 3600000),
          read: false,
        },
        {
          id: 2,
          sender: 'Administration',
          subject: 'Weekly report available',
          preview: 'Your weekly report is now available...',
          timestamp: new Date(Date.now() - 86400000),
          read: true,
        },
        {
          id: 3,
          sender: 'Parent #2',
          subject: 'Schedule change request',
          preview: 'I would like to request a schedule change...',
          timestamp: new Date(Date.now() - 172800000),
          read: true,
        },
      ]);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: 'home', onClick: () => navigate('/home/overview') },
    { id: 'students', label: "Tableau d'Éleves", icon: 'users', onClick: () => navigate('/notes') },
    { id: 'activities', label: 'Activités', icon: 'listTodo', onClick: () => navigate('/activities') },
    { id: 'messages', label: 'Mes messages', icon: 'messagesSquare', count: messages.length, countVariant: 'alert', selected: true, onClick: () => {} },
    { id: 'admin', label: 'Administration', icon: 'settings', onClick: () => navigate('/administration') },
  ];

  return (
    <DashboardLayout 
      user={user} 
      onLogout={handleLogout}
      navItems={navItems}
      selectedNavItem="messages"
    >
      <div className="messages-page">
        <div className="messages-header">
          <h1>Mes Messages</h1>
          <div className="messages-actions">
            <Button variant="secondary" size="medium">
              Marquer tout comme lu
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="messages-loading">
            <p>Chargement des messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="messages-empty">
            <p>Aucun message pour le moment</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-item ${message.read ? '' : 'unread'} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="message-header">
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleDateString()}
                  </div>
                </div>
                <div className="message-subject">{message.subject}</div>
                <div className="message-preview">{message.preview}</div>
              </div>
            ))}
          </div>
        )}

        {selectedMessage && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h2>{selectedMessage.subject}</h2>
              <Button 
                variant="ghost" 
                size="medium"
                onClick={() => setSelectedMessage(null)}
              >
                Fermer
              </Button>
            </div>
            <div className="message-detail-info">
              <p><strong>De:</strong> {selectedMessage.sender}</p>
              <p><strong>Date:</strong> {selectedMessage.timestamp.toLocaleString()}</p>
            </div>
            <div className="message-detail-body">
              {selectedMessage.preview}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
