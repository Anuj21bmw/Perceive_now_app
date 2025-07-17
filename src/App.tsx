// src/App.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Shield, TrendingUp, Users, FileText, LogOut, UserCheck } from 'lucide-react';
import ReportDashboard from './components/ReportDashboard';
import LoginForm from './components/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  const getRoleColor = (role: string) => {
    return role === 'reviewer' ? 'text-perceive-gold' : 'text-perceive-purple';
  };

  const getRoleBadge = (role: string) => {
    return role === 'reviewer' ? 'bg-perceive-gold text-white' : 'bg-perceive-purple text-white';
  };

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
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserCheck className={`w-4 h-4 ${getRoleColor(user?.role || '')}`} />
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      isDark ? 'text-dark-text' : 'text-gray-700'
                    }`}>
                      {user?.username}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(user?.role || '')}`}>
                      {user?.role?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-dark-surface-elevated text-dark-text hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Role-specific Welcome Banner */}
      {user?.role === 'reviewer' && (
        <div className="bg-perceive-gold text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                Reviewer Access: You can view detailed analytics and provide feedback
              </span>
            </div>
          </div>
        </div>
      )}

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
            {user?.role === 'reviewer' && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-perceive-gold rounded-full"></div>
                <span className={`text-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                }`}>
                  Advanced reviewer capabilities enabled
                </span>
              </div>
            )}
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