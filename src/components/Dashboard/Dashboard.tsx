import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Assessment from './Assessment';
import TaraAI from './TaraAI';
import Resources from './Resources';
import Schedule from './Schedule';
import Settings from './Settings';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/tara" element={<TaraAI />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;