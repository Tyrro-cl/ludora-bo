import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Icon  } from 'lucide-react';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import TeacherLoginPage from './pages/TeacherLoginPage/TeacherLoginPage';
import HomePage from './pages/HomePage/HomePage';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage';
import NotesPage from './pages/NotesPage';
import MessagesPage from './pages/MessagesPage';
import AdministrationPage from './pages/AdministrationPage';
import StudentDetailPage from './pages/StudentDetailPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import UICheckerPage from './pages/UICheckerPage/UICheckerPage';
import ComponentDetailPage from './pages/ComponentDetailPage/ComponentDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login/teacher" element={<TeacherLoginPage />} />
          <Route 
            path="/home" 
            element={<Navigate to="/home/overview" replace />} 
          />
          <Route 
            path="/home/overview" 
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/activities" 
            element={
              <PrivateRoute>
                <ActivitiesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/activities/:activityId" 
            element={
              <PrivateRoute>
                <ActivityDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/notes" 
            element={
              <PrivateRoute>
                <NotesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/students/:studentId" 
            element={
              <PrivateRoute>
                <StudentDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <PrivateRoute>
                <MessagesPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/administration" 
            element={
              <PrivateRoute>
                <AdministrationPage />
              </PrivateRoute>
            } 
          />
          <Route path="/ui-checker" element={<UICheckerPage />} />
          <Route path="/ui-checker/:componentId" element={<ComponentDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
