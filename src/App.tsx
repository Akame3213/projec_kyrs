import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import JobListPage from './pages/JobListPage/JobListPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ResumePage from './pages/ResumePage/ResumePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SavedJobsPage from './pages/SavedJobsPage/SavedJobsPage';
import AddJobPage from './pages/AddJobPage/AddJobPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobListPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-job" element={<AddJobPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/resume" 
                element={
                  <ProtectedRoute>
                    <ResumePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/saved-jobs" 
                element={
                  <ProtectedRoute>
                    <SavedJobsPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/\" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;