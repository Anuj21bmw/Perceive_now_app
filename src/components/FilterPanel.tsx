// src/components/FilterPanel.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';

interface FilterPanelProps {
  filters: {
    reportType: string;
    industry: string;
    minConfidence: number;
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, onClose }) => {
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const [types, industriesData] = await Promise.all([
        apiService.getReportTypes(),
        apiService.getIndustries(),
      ]);
      setReportTypes(types);
      setIndustries(industriesData);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      reportType: '',
      industry: '',
      minConfidence: 0,
    });
  };

  const formatLabel = (value: string) => {
    return value.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`${
        isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      } rounded-xl border shadow-lg p-6`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Filter Reports
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetFilters}
            className={`flex items-center px-3 py-1 rounded-lg text-sm ${
              isDark 
                ? 'text-dark-text-secondary hover:bg-dark-surface-elevated' 
                : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </button>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${
              isDark 
                ? 'text-dark-text-secondary hover:bg-dark-surface-elevated' 
                : 'text-gray-600 hover:bg-gray-100'
            } transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Type Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-dark-text' : 'text-gray-700'
          }`}>
            Report Type
          </label>
          <select
            value={filters.reportType}
            onChange={(e) => handleFilterChange('reportType', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDark 
                ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
          >
            <option value="">All Types</option>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {formatLabel(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-dark-text' : 'text-gray-700'
          }`}>
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${
              isDark 
                ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {formatLabel(industry)}
              </option>
            ))}
          </select>
        </div>

        {/* Confidence Score Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-dark-text' : 'text-gray-700'
          }`}>
            Minimum Confidence: {filters.minConfidence}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minConfidence}
            onChange={(e) => handleFilterChange('minConfidence', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {filters.reportType && (
            <span className="px-2 py-1 bg-perceive-purple text-white text-xs rounded-full">
              Type: {formatLabel(filters.reportType)}
            </span>
          )}
          {filters.industry && (
            <span className="px-2 py-1 bg-perceive-purple text-white text-xs rounded-full">
              Industry: {formatLabel(filters.industry)}
            </span>
          )}
          {filters.minConfidence > 0 && (
            <span className="px-2 py-1 bg-perceive-purple text-white text-xs rounded-full">
              Min Confidence: {filters.minConfidence}%
            </span>
          )}
          {!filters.reportType && !filters.industry && filters.minConfidence === 0 && (
            <span className={`text-sm ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
            }`}>
              No filters applied
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterPanel;