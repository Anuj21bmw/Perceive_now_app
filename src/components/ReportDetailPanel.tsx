// src/components/ReportDetailPanel.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Calendar, Building, FileText, Star, MessageCircle } from 'lucide-react';
import { Report } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';
import ConfidenceMeter from './ConfidenceMeter';
import SourceTraceCard from './SourceTraceCard';
import FeedbackForm from './FeedbackForm';

interface ReportDetailPanelProps {
  report: Report;
  onClose: () => void;
}

const ReportDetailPanel: React.FC<ReportDetailPanelProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'sources' | 'feedback'>('summary');
  const { isDark } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

  const formatLabel = (value: string) => {
    return value.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const tabs = [
    { id: 'summary', label: 'Report Summary', icon: FileText },
    { id: 'sources', label: 'Why We Trust This', icon: TrendingUp },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`${
          isDark ? 'bg-dark-surface' : 'bg-white'
        } rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${
          isDark ? 'bg-dark-surface-elevated border-dark-border' : 'bg-gray-50 border-gray-200'
        } border-b px-6 py-4`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getReportTypeColor(report.report_type)
                }`}>
                  {formatLabel(report.report_type)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                  {formatLabel(report.industry)}
                </span>
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {report.title}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    Updated {formatDate(report.updated_at)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                  }`}>
                    {report.metadata.analyst || 'System Generated'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ConfidenceMeter score={report.confidence_score} />
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${
                  isDark 
                    ? 'text-dark-text-secondary hover:bg-dark-surface' 
                    : 'text-gray-600 hover:bg-gray-100'
                } transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`${
          isDark ? 'bg-dark-surface-elevated border-dark-border' : 'bg-white border-gray-200'
        } border-b px-6`}>
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-perceive-purple text-perceive-purple'
                      : `border-transparent ${
                          isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-600 hover:text-gray-900'
                        }`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Executive Summary
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                }`}>
                  {report.executive_summary}
                </p>
              </div>

              {/* Key Findings */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Key Findings
                </h3>
                <div className="space-y-3">
                  {report.key_findings.map((finding, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start space-x-3 p-3 rounded-lg ${
                        isDark ? 'bg-dark-surface-elevated' : 'bg-gray-50'
                      }`}
                    >
                      <div className="w-6 h-6 bg-perceive-purple rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className={`text-sm ${
                        isDark ? 'text-dark-text' : 'text-gray-700'
                      }`}>
                        {finding}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Report Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(report.metadata).map(([key, value]) => (
                    <div key={key} className={`p-3 rounded-lg ${
                      isDark ? 'bg-dark-surface-elevated' : 'bg-gray-50'
                    }`}>
                      <div className={`text-xs font-medium mb-1 ${
                        isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                      }`}>
                        {formatLabel(key)}
                      </div>
                      <div className={`text-sm ${
                        isDark ? 'text-dark-text' : 'text-gray-900'
                      }`}>
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Source Traceability
                </h3>
                <p className={`text-sm mb-6 ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                }`}>
                  Every insight in this report is backed by verifiable sources. Our confidence score reflects the 
                  reliability and quality of these data sources.
                </p>
              </div>

              <div className="space-y-4">
                {report.source_traces.map((source, index) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SourceTraceCard source={source} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Provide Feedback
                </h3>
                <p className={`text-sm mb-6 ${
                  isDark ? 'text-dark-text-secondary' : 'text-gray-600'
                }`}>
                  Help us improve our intelligence by sharing your thoughts on this report.
                </p>
              </div>

              <FeedbackForm reportId={report.id} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportDetailPanel;