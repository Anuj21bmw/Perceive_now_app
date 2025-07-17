// src/services/authService.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface User {
  id: string;
  username: string;
  role: 'viewer' | 'reviewer';
  created_at: string;
}

class AuthService {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/token`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    if (!this.token) {
      throw new Error('No token available');
    }

    const response = await axios.get<User>(`${API_BASE_URL}/auth/me`);
    return response.data;
  }
}

export const authService = new AuthService();