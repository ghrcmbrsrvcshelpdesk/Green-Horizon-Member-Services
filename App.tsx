import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { ParticipantPortal } from './pages/ParticipantPortal';
import { AdminPortal } from './pages/AdminPortal';
import { VerificationPortal } from './pages/VerificationPortal';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ParticipantPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/verification" element={<VerificationPortal />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
