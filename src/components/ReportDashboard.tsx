// src/components/ReportDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, FileText, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { apiService, Report } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';
import ReportCard from './ReportCard';
import ReportDetailPanel from './ReportDetailPanel';
import FilterPanel from './FilterPanel';

const ReportDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();

  const [filters, setFilters] = useState({
    reportType: '',
    industry: '',
    minConfidence: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reports, searchTerm, filters]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getReports();
      setReports(data);
      setError(null);
    } catch (err) {
      setError('Failed to load reports');
      console.error('Error loading reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reports];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.executive_summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.reportType) {
      filtered = filtered.filter(report => report.report_type === filters.reportType);
    }

    // Industry filter
    if (filters.industry) {
      filtered = filtered.filter(report => report.industry === filters.industry);
    }

    // Confidence filter
    if (filters.minConfidence > 0) {
      filtered = filtered.filter(report => report.confidence_score >= filters.minConfidence);
    }

    setFilteredReports(filtered);
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
  };

  const handleCloseDetail = () => {
    setSelectedReport(null);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-perceive-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className={`text-center ${isDark ? 'text-dark-text' : 'text-gray-600'}`}>
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p>{error}</p>
          <button
            onClick={loadReports}
            className="mt-4 px-4 py-2 bg-perceive-purple text-white rounded-lg hover:bg-perceive-purple-light"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${
            isDark ? 'bg-dark-surface' : 'bg-white'
          } rounded-xl p-6 shadow-lg border ${
            isDark ? 'border-dark-border' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                Total Reports
              </p>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {reports.length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-perceive-purple" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${
            isDark ? 'bg-dark-surface' : 'bg-white'
          } rounded-xl p-6 shadow-lg border ${
            isDark ? 'border-dark-border' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                Avg Confidence
              </p>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {reports.length > 0 
                  ? Math.round(reports.reduce((acc, r) => acc + r.confidence_score, 0) / reports.length) 
                  : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-perceive-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${
            isDark ? 'bg-dark-surface' : 'bg-white'
          } rounded-xl p-6 shadow-lg border ${
            isDark ? 'border-dark-border' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                Recent Updates
              </p>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {reports.filter(r => {
                  const updatedAt = new Date(r.updated_at);
                  const now = new Date();
                  const diffDays = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${
            isDark ? 'bg-dark-surface' : 'bg-white'
          } rounded-xl p-6 shadow-lg border ${
            isDark ? 'border-dark-border' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDark ? 'text-dark-text-secondary' : 'text-gray-600'
              }`}>
                High Confidence
              </p>
              <p className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {reports.filter(r => r.confidence_score >= 85).length}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              isDark 
                ? 'bg-dark-surface border-dark-border text-dark-text' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-4 py-3 rounded-lg border ${
            isDark 
              ? 'bg-dark-surface border-dark-border text-dark-text hover:bg-dark-surface-elevated' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors`}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReportCard
                report={report}
                onClick={() => handleReportSelect(report)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReports.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className={`text-lg ${isDark ? 'text-dark-text' : 'text-gray-600'}`}>
            No reports found matching your criteria
          </p>
        </div>
      )}

      {/* Report Detail Panel */}
      <AnimatePresence>
        {selectedReport && (
          <ReportDetailPanel
            report={selectedReport}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportDashboard;