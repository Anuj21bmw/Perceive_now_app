// src/components/FeedbackForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Star, Flag, MessageSquare, CheckCircle } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useTheme } from '../contexts/ThemeContext';

interface FeedbackFormProps {
  reportId: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ reportId }) => {
  const [formData, setFormData] = useState({
    user_comment: '',
    flagged_section: '',
    rating: 0,
    improvement_suggestions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { isDark } = useTheme();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_comment.trim()) {
      setError('Please provide a comment');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await apiService.createFeedback({
        report_id: reportId,
        user_comment: formData.user_comment,
        flagged_section: formData.flagged_section || undefined,
        rating: formData.rating || undefined,
        improvement_suggestions: formData.improvement_suggestions || undefined,
      });

      setIsSubmitted(true);
      setFormData({
        user_comment: '',
        flagged_section: '',
        rating: 0,
        improvement_suggestions: '',
      });
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error('Feedback submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleInputChange('rating', star)}
          className={`transition-colors ${
            star <= formData.rating
              ? 'text-yellow-400'
              : isDark ? 'text-gray-600' : 'text-gray-300'
          } hover:text-yellow-400`}
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
      <span className={`ml-2 text-sm ${
        isDark ? 'text-dark-text-secondary' : 'text-gray-600'
      }`}>
        {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'No rating'}
      </span>
    </div>
  );

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 ${
          isDark ? 'bg-dark-surface-elevated' : 'bg-green-50'
        } rounded-lg`}
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className={`text-lg font-semibold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Thank you for your feedback!
        </h3>
        <p className={`text-sm ${
          isDark ? 'text-dark-text-secondary' : 'text-gray-600'
        }`}>
          Your input helps us improve our intelligence reports.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-sm text-perceive-purple hover:text-perceive-purple-light font-medium"
        >
          Submit another feedback
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-dark-text' : 'text-gray-700'
        }`}>
          Overall Rating
        </label>
        <StarRating />
      </div>

      {/* Comment */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-dark-text' : 'text-gray-700'
        }`}>
          Your Comment *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <textarea
            value={formData.user_comment}
            onChange={(e) => handleInputChange('user_comment', e.target.value)}
            placeholder="Share your thoughts on this report..."
            rows={4}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border resize-none ${
              isDark 
                ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
            required
          />
        </div>
      </div>

      {/* Flagged Section */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-dark-text' : 'text-gray-700'
        }`}>
          Flag Specific Section (Optional)
        </label>
        <div className="relative">
          <Flag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={formData.flagged_section}
            onChange={(e) => handleInputChange('flagged_section', e.target.value)}
            placeholder="e.g., Executive Summary, Key Finding #2"
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              isDark 
                ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
          />
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDark ? 'text-dark-text' : 'text-gray-700'
        }`}>
          Improvement Suggestions (Optional)
        </label>
        <textarea
          value={formData.improvement_suggestions}
          onChange={(e) => handleInputChange('improvement_suggestions', e.target.value)}
          placeholder="What would make this report more valuable?"
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border resize-none ${
            isDark 
              ? 'bg-dark-surface-elevated border-dark-border text-dark-text' 
              : 'bg-white border-gray-300 text-gray-900'
          } focus:ring-2 focus:ring-perceive-purple focus:border-transparent`}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-perceive-purple hover:bg-perceive-purple-light'
        } text-white`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Feedback</span>
          </>
        )}
      </button>
    </form>
  );
};

export default FeedbackForm;