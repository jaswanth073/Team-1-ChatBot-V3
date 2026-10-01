const API_BASE_URL = 'http://localhost:5000';

export interface UserProfile {
  age?: string;
  biological_sex?: string;
  updated_at?: string;
}

export interface ParentalProfile {
  child_age?: string;
  child_biological_sex?: string;
  child_relation?: string;
  updated_at?: string;
}

class ApiService {
  private getHeaders(token?: string) {
    const headers: any = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // User Profile
  async getUserProfile(token: string): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: this.getHeaders(token),
    });
    return response.json();
  }

  async updateUserProfile(token: string, age: string, biological_sex: string) {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ age, biological_sex }),
    });
    return response.json();
  }

  // Parental Profile
  async getParentalProfile(token: string): Promise<ParentalProfile> {
    const response = await fetch(`${API_BASE_URL}/parental-profile`, {
      headers: this.getHeaders(token),
    });
    return response.json();
  }

  async updateParentalProfile(
    token: string,
    child_age: string,
    child_biological_sex: string,
    child_relation: string
  ) {
    const response = await fetch(`${API_BASE_URL}/parental-profile`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ child_age, child_biological_sex, child_relation }),
    });
    return response.json();
  }

  // Chat History
  async saveChatHistory(token: string, message: any, chat_type: 'normal' | 'parental') {
    const response = await fetch(`${API_BASE_URL}/chat-history`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ message, chat_type }),
    });
    return response.json();
  }

  async getChatHistory(token: string) {
    const response = await fetch(`${API_BASE_URL}/chat-history`, {
      headers: this.getHeaders(token),
    });
    return response.json();
  }

  // Feedback
  async submitFeedback(token: string, rating: number, comment: string) {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify({ rating, comment }),
    });
    return response.json();
  }
}

export const apiService = new ApiService();
