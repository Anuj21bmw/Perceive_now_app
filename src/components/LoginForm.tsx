// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Lock, Eye, EyeOff, UserCheck, Crown } from 'lucide-react';
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

  const quickLogin = (role: 'viewer' | 'reviewer') => {
    if (role === 'viewer') {
      setUsername('viewer_user');
      setPassword('viewer_pass');
    } else {
      setUsername('reviewer_user');
      setPassword('reviewer_pass');
    }
  };

  const demoCredentials = [
    { 
      username: 'viewer_user', 
      password: 'viewer_pass', 
      role: 'Viewer',
      description: 'Standard access to reports and basic features',
      icon: UserCheck,
      color: 'bg-perceive-purple hover:bg-perceive-purple-light'
    },
    { 
      username: 'reviewer_user', 
      password: 'reviewer_pass', 
      role: 'Reviewer',
      description: 'Advanced access with detailed analytics and feedback',
      icon: Crown,
      color: 'bg-perceive-gold hover:bg-perceive-gold-dark'
    },
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

          {/* Quick Access Buttons */}
          <div className="mb-6">
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-dark-text' : 'text-gray-700'
            }`}>
              Quick Access:
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {demoCredentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => quickLogin(cred.role.toLowerCase() as 'viewer' | 'reviewer')}
                    className={`${cred.color} text-white p-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">{cred.role}</div>
                        <div className="text-sm opacity-90">{cred.description}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${
                isDark ? 'border-dark-border' : 'border-gray-300'
              }`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                isDark ? 'bg-dark-surface text-dark-text-secondary' : 'bg-white text-gray-500'
              }`}>
                Or sign in manually
              </span>
            </div>
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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
              >
                {error}
              </motion.div>
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

          {/* Demo Credentials Reference */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className={`text-xs font-medium mb-2 ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
            }`}>
              Demo Credentials:
            </h3>
            <div className="space-y-1">
              {demoCredentials.map((cred, index) => (
                <div key={index} className={`text-xs ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                }`}>
                  <span className="font-mono">{cred.username}</span> / <span className="font-mono">{cred.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;