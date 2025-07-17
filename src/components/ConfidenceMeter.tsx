// src/components/ConfidenceMeter.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ConfidenceMeterProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ score, size = 'md' }) => {
  const { isDark } = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981'; // green
    if (score >= 70) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'High Confidence';
    if (score >= 70) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const sizeClasses = {
    sm: { container: 'w-20 h-20', text: 'text-xs', icon: 'w-4 h-4' },
    md: { container: 'w-24 h-24', text: 'text-sm', icon: 'w-5 h-5' },
    lg: { container: 'w-32 h-32', text: 'text-base', icon: 'w-6 h-6' },
  };

  const classes = sizeClasses[size];
  const circumference = 2 * Math.PI * 35;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${classes.container}`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke={isDark ? '#374151' : '#E5E7EB'}
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="40"
            cy="40"
            r="35"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <TrendingUp className={`${classes.icon} text-perceive-gold mb-1`} />
          <span className={`font-bold ${classes.text} ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {Math.round(score)}%
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <div className={`${classes.text} font-medium ${
          isDark ? 'text-dark-text' : 'text-gray-900'
        }`}>
          {getScoreLabel(score)}
        </div>
        <div className={`text-xs ${
          isDark ? 'text-dark-text-secondary' : 'text-gray-600'
        }`}>
          Confidence Score
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;