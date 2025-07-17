// src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Shield, TrendingUp, Users, FileText } from 'lucide-react';
import ReportDashboard from './components/ReportDashboard';
import LoginForm from './components/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'dark bg-dark-bg' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${
        isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      } border-b backdrop-blur-sm bg-opacity-90`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-perceive-purple" />
                <span className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Perceive Now
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-perceive-gold" />
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    Intelligence Engine
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-perceive-purple" />
                <span className={`text-sm ${
                  isDark ? 'text-dark-text' : 'text-gray-700'
                }`}>
                  {user?.username} ({user?.role})
                </span>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-dark-surface-elevated text-dark-text hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Intelligence Dashboard
            </h1>
            <p className={`mt-2 ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-600'
            }`}>
              Where every decision is backed by data, and every insight builds trust.
            </p>
          </div>
          
          <ReportDashboard />
        </motion.div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;