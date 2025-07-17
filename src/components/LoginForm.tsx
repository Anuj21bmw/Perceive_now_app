// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { username: 'viewer_user', password: 'viewer_pass', role: 'Viewer' },
    { username: 'reviewer_user', password: 'reviewer_pass', role: 'Reviewer' },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark ? 'bg-dark-bg' : 'bg-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-4"
      >
        <div className={`${
          isDark ? 'bg-dark-surface' : 'bg-white'
        } rounded-2xl shadow-2xl p-8`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-perceive-purple" />
            </div>
            <h1 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Perceive Now
            </h1>
            <p className={`mt-2 ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-600'
            }`}>
              Intelligence Engine Access
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-dark-text' : 'text-gray-700'
              }`}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-dark-text' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    isDark 
                      ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-perceive-purple hover:bg-perceive-purple-light'
              } text-white`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-dark-text' : 'text-gray-700'
            }`}>
              Demo Credentials:
            </h3>
            <div className="space-y-2">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setUsername(cred.username);
                    setPassword(cred.password);
                  }}
                  className={`w-full p-3 rounded-lg border text-left hover:bg-opacity-50 transition-colors ${
                    isDark 
                      ? 'border-dark-border bg-dark-surface-elevated hover:bg-gray-700' 
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`font-medium ${
                    isDark ? 'text-dark-text' : 'text-gray-900'
                  }`}>
                    {cred.role}
                  </div>
                  <div className={`text-sm ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    {cred.username} / {cred.password}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;