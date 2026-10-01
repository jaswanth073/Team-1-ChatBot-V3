
export enum RiskLevel {
  LOW = 'Low Risk',
  MODERATE = 'Moderate Risk',
  HIGH = 'High Risk'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface HealthAssessment {
  understanding: string;
  possibleCauses: string[];
  riskLevel: RiskLevel;
  recommendations: string[];
  whenToSeeDoctor: string[];
  isEmergency: boolean;
}

export interface UserProfile {
  age?: string;
  sex?: string;
  symptoms?: string;
  duration?: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
  conditions?: string;
}
