// src/components/SourceTraceCard.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Database, Calendar, BarChart3, FileText } from 'lucide-react';
import { SourceTrace } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';

interface SourceTraceCardProps {
  source: SourceTrace;
}

const SourceTraceCard: React.FC<SourceTraceCardProps> = ({ source }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDark } = useTheme();

  const getReliabilityColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSourceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'primary research':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'news intelligence':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'web scraping':
        return <BarChart3 className="w-5 h-5 text-orange-600" />;
      case 'expert opinion':
        return <Calendar className="w-5 h-5 text-green-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className={`${
        isDark ? 'bg-dark-surface-elevated border-dark-border' : 'bg-white border-gray-200'
      } border rounded-lg overflow-hidden`}
    >
      <div
        className={`p-4 cursor-pointer transition-colors ${
          isDark ? 'hover:bg-dark-surface' : 'hover:bg-gray-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getSourceTypeIcon(source.source_type)}
            <div>
              <h4 className={`font-medium ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {source.source_name}
              </h4>
              <p className={`text-sm ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                {source.source_type}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-sm font-medium ${
                getReliabilityColor(source.reliability_score).split(' ')[0]
              }`}>
                {Math.round(source.reliability_score)}% Reliable
              </div>
              <div className={`text-xs ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>
                {source.data_points} data points
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                getReliabilityColor(source.reliability_score)
              }`}>
                {source.reliability_score >= 85 ? 'High' : source.reliability_score >= 70 ? 'Medium' : 'Low'}
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`border-t ${
              isDark ? 'border-dark-border bg-dark-surface' : 'border-gray-200 bg-gray-50'
            } p-4`}
          >
            <div className="space-y-4">
              {/* Reliability Score Breakdown */}
              <div>
                <h5 className={`text-sm font-medium mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Reliability Breakdown
                </h5>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-perceive-purple to-perceive-gold h-2 rounded-full transition-all duration-300"
                    style={{ width: `${source.reliability_score}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className={isDark ? 'text-dark-text-secondary' : 'text-gray-600'}>
                    0%
                  </span>
                  <span className={isDark ? 'text-dark-text-secondary' : 'text-gray-600'}>
                    {Math.round(source.reliability_score)}%
                  </span>
                  <span className={isDark ? 'text-dark-text-secondary' : 'text-gray-600'}>
                    100%
                  </span>
                </div>
              </div>

              {/* Methodology */}
              <div>
                <h5 className={`text-sm font-medium mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Methodology
                </h5>
                <p className={`text-sm ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                }`}>
                  {source.methodology}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-dark-surface-elevated' : 'bg-white'
                }`}>
                  <div className={`text-xs font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    Data Points
                  </div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {source.data_points.toLocaleString()}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-dark-surface-elevated' : 'bg-white'
                }`}>
                  <div className={`text-xs font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    Last Updated
                  </div>
                  <div className={`text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatDate(source.last_updated)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SourceTraceCard;