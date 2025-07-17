// src/services/apiService.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface SourceTrace {
  id: string;
  source_name: string;
  source_type: string;
  reliability_score: number;
  data_points: number;
  last_updated: string;
  methodology: string;
}

export interface Report {
  id: string;
  title: string;
  summary: string;
  report_type: string;
  industry: string;
  confidence_score: number;
  created_at: string;
  updated_at: string;
  executive_summary: string;
  key_findings: string[];
  source_traces: SourceTrace[];
  metadata: Record<string, any>;
}

export interface Feedback {
  id: string;
  report_id: string;
  user_comment: string;
  flagged_section?: string;
  rating?: number;
  improvement_suggestions?: string;
  created_at: string;
  user_id?: string;
}

export interface CreateFeedbackRequest {
  report_id: string;
  user_comment: string;
  flagged_section?: string;
  rating?: number;
  improvement_suggestions?: string;
}

class ApiService {
  private baseURL = `${API_BASE_URL}/api/v1`;

  async getReports(filters?: {
    report_type?: string;
    industry?: string;
    min_confidence?: number;
  }): Promise<Report[]> {
    const params = new URLSearchParams();
    if (filters?.report_type) params.append('report_type', filters.report_type);
    if (filters?.industry) params.append('industry', filters.industry);
    if (filters?.min_confidence) params.append('min_confidence', filters.min_confidence.toString());

    const response = await axios.get<Report[]>(`${this.baseURL}/reports?${params}`);
    return response.data;
  }

  async getReport(id: string): Promise<Report> {
    const response = await axios.get<Report>(`${this.baseURL}/reports/${id}`);
    return response.data;
  }

  async getReportTypes(): Promise<string[]> {
    const response = await axios.get<string[]>(`${this.baseURL}/reports/types/`);
    return response.data;
  }

  async getIndustries(): Promise<string[]> {
    const response = await axios.get<string[]>(`${this.baseURL}/reports/industries/`);
    return response.data;
  }

  async createFeedback(feedback: CreateFeedbackRequest): Promise<Feedback> {
    const response = await axios.post<Feedback>(`${this.baseURL}/feedback/`, feedback);
    return response.data;
  }

  async getFeedbackForReport(reportId: string): Promise<Feedback[]> {
    const response = await axios.get<Feedback[]>(`${this.baseURL}/feedback/report/${reportId}`);
    return response.data;
  }
}

export const apiService = new ApiService();