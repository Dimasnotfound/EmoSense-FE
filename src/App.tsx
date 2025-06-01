import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProjectInfo from './components/ProjectInfo';
import TeamSection from './components/TeamSection';
import DiagnosePage from './components/DiagnosePage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ProjectInfo />
                <TeamSection />
              </>
            }
          />
          <Route path="/diagnose" element={<DiagnosePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/privacy" element={<div>Privacy Policy</div>} />
          <Route path="/terms" element={<div>Terms of Service</div>} />
          <Route path="/contact" element={<div>Contact Us</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;