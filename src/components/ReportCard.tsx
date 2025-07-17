// src/components/ReportCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Building, FileText, ChevronRight } from 'lucide-react';
import { Report } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  const { isDark } = useTheme();

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getReportTypeColor = (type: string) => {
    const colors = {
      market_analysis: 'bg-blue-100 text-blue-800',
      competitive_intel: 'bg-purple-100 text-purple-800',
      risk_assessment: 'bg-red-100 text-red-800',
      financial_forecast: 'bg-green-100 text-green-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      technology: 'bg-indigo-100 text-indigo-800',
      healthcare: 'bg-pink-100 text-pink-800',
      finance: 'bg-green-100 text-green-800',
      retail: 'bg-orange-100 text-orange-800',
      energy: 'bg-yellow-100 text-yellow-800',
    };
    return colors[industry as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${
        isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      } rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {report.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getReportTypeColor(report.report_type)
              }`}>
                {report.report_type.replace('_', ' ').toUpperCase()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                getIndustryColor(report.industry)
              }`}>
                {report.industry.toUpperCase()}
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </div>

        {/* Summary */}
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDark ? 'text-dark-text-secondary' : 'text-gray-600'
        }`}>
          {report.summary}
        </p>

        {/* Confidence Score */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-perceive-gold" />
            <span className={`text-sm font-medium ${
              isDark ? 'text-dark-text' : 'text-gray-700'
            }`}>
              Confidence Score
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-perceive-purple to-perceive-gold transition-all duration-300"
                style={{ width: `${report.confidence_score}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${
              getConfidenceColor(report.confidence_score).split(' ')[0]
            }`}>
              {Math.round(report.confidence_score)}%
            </span>
          </div>
        </div>

        {/* Key Findings Preview */}
        <div className="mb-4">
          <h4 className={`text-sm font-semibold mb-2 ${
            isDark ? 'text-dark-text' : 'text-gray-700'
          }`}>
            Key Findings:
          </h4>
          <ul className="space-y-1">
            {report.key_findings.slice(0, 2).map((finding, index) => (
              <li key={index} className={`text-xs flex items-start ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                <span className="w-1 h-1 bg-perceive-purple rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="line-clamp-2">{finding}</span>
              </li>
            ))}
            {report.key_findings.length > 2 && (
              <li className={`text-xs ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                +{report.key_findings.length - 2} more findings
              </li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className={`text-xs ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>
                {formatDate(report.updated_at)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className={`text-xs ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-500'
              }`}>
                {report.source_traces.length} sources
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Building className="w-4 h-4 text-gray-400" />
            <span className={`text-xs ${
              isDark ? 'text-dark-text-secondary' : 'text-gray-500'
            }`}>
              {report.metadata.analyst || 'System'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;